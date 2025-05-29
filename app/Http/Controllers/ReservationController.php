<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Reservation;
use App\Models\ReservationDay;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller 
{
    public function showCalendar(int $courseId)
    {
        // 選択したコースの取得
        $course = Course::findOrFail($courseId); 

        // 予約できる日を表示
        $allReservationDays =  ReservationDay::orderBy('date')->get();
        $calendarData = [];

        foreach ($allReservationDays as $day) {

            $date = Carbon::parse($day->date)->toDateString();
            $reservedCount = Reservation::where('start_date', $date)->count();
            $max = $day->max_reservations;
        
            if ($max <= 0 || $reservedCount >= $max) {
                $status = 'full'; // ×
            } elseif ($reservedCount >= $max - 2) {
                $status = 'few'; // △
            } else {
                $status = 'available'; // ○
            }
        
            $calendarData[$date] = $status;
        }
    
        return Inertia::render('User/ReservationCalendar', [
            'courseId' => $course->id,
            'course' => $course,
            'calendarData' => $calendarData,
        ]);

    }
    
    public function create(Request $request)
    {
        return Inertia::render('User/ReservationForm', [
            'selectedDate' => $request->query('selectedDate'),
            'courseId' => $request->query('courseId'),
        ]);
    }
    
    public function store(Request $request)
    {
        $user = Auth::user();
    
        // バリデーション
        $validated = $request->validate([
            'plushie_name' => 'required|string|max:255',
            'plushie_status' => 'nullable|exists:plushie_statuses,id',
            'postal_code' => 'required|string',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'start_date' => 'required|date',
            'course_id' => 'required|exists:courses,id',
        ]);
        
        DB::beginTransaction();
        
        try {
            // ぬいぐるみ登録
            $plushie = $user->plushie()->create([
                'name' => $validated['plushie_name'],
                'status_id' => 1,
            ]);
            
            $course = Course::findOrFail($validated['course_id']);
            $duration = $course->duration_days;
            
            $startDate = Carbon::parse($validated['start_date'])->setTimezone(config('app.timezone'));
            
            $availableDates = [];
            $current = $startDate->copy();
            
            // 最大30日間の中から予約枠を探す
            while (count($availableDates) < $duration && $current->diffInDays($startDate) < 30) {
                $reservationDay = ReservationDay::where('date', $current->toDateString())->first();
            
                if ($reservationDay) {
                    $currentCount = Reservation::where('start_date', $current->toDateString())->count();
            
                    if ($currentCount < $reservationDay->max_reservations) {
                        $availableDates[] = $current->copy(); // 空いてる日を記録
                    }
                }
            
                $current->addDay(); // 次の日へ
            }
    
            if (count($availableDates) < $duration) {
                throw ValidationException::withMessages([
                    'start_date' => '選択日から30日以内に必要な予約枠を確保できませんでした。',
                ]);
            }
    
            // 予約登録（最初と最後を保存）
            $reservation = $user->reservation()->create([
                'plushie_id' => $plushie->id,
                'course_id' => $course->id,
                'start_date' => $availableDates[0]->toDateString(),
                'completed_at' => $availableDates[$duration - 1]->toDateString(),
                'postal_code' => $validated['postal_code'],
                'address_line1' => $validated['address_line1'],
                'address_line2' => $validated['address_line2'],
                'phone_number' => $validated['phone_number'],
            ]);
    
            DB::commit();
            return redirect()->route('mypage')->with('success', '予約が完了しました');
    
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('予約処理中にエラー: ' . $e->getMessage());
            return back()->withErrors(['error' => '予約処理中に問題が発生しました。']);
        }
    }

    public function myReserve()
    {
        $userId = Auth::id();
    
        $currentReservations = Reservation::with(['plushie.status', 'course'])
        ->where('user_id', $userId)
        ->whereHas('plushie.status', function ($query) {
            $query->where('status', '!=', '完了');
        })
        ->orderBy('start_date')
        ->paginate(10);
    
    $pastReservations = Reservation::with(['plushie.status', 'course'])
        ->where('user_id', $userId)
        ->whereHas('plushie.status', function ($query) {
            $query->where('status', '完了');
        })
        ->orderBy('start_date', 'desc')
        ->paginate(10);
    
        return Inertia::render('User/ReservationList', [
            'currentReservations' => $currentReservations,
            'pastReservations' => $pastReservations,
        ]);
    }

    public function destroy(string $reservationId)
    {
        $reservation = Reservation::find($reservationId);
    
        if (!$reservation) {
            return redirect()
                ->route('reservations')
                ->withErrors(['予約が見つかりませんでした。']);
        }
    
        $reservation->delete();
    
        return redirect()
            ->route('reservations')
            ->with('deleteMessage', '予約を削除しました。');
    }
    
    public function edit(Reservation $reservation)
    {
        $reservation->load('plushie');

        return Inertia::render('User/ReservationEdit', [
            'reservation' => [
                'id' => $reservation->id,
                'plushie_name' => $reservation->plushie->name ?? '',
                'postal_code' => $reservation->postal_code,
                'address_line1' => $reservation->address_line1,
                'address_line2' => $reservation->address_line2,
                'phone_number' => $reservation->phone_number,
            ],
        ]);
    }
    
    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'plushie_name' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:20',
        ]);
    
        $reservation->update($validated);
    
        return redirect()->route('reservations')->with('message', '予約情報を更新しました');
    }

}

