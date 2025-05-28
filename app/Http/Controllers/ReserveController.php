<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Reservation;
use App\Models\ReservationDay;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;


class ReserveController extends Controller 
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
    
        return Inertia::render('User/ReserveCalendar', [
            'courseId' => $course->id,
            'course' => $course,
            'calendarData' => $calendarData,
        ]);

    }
    
    public function create(Request $request)
    {
        return Inertia::render('User/ReserveForm', [
            'selectedDate' => $request->query('selectedDate'),
            'courseId' => $request->query('courseId'),
        ]);
    }
    
    public function store(Request $request)
    {
        $user = Auth::user();
    
        $validated = $request->validate([
            'plushie_name' => 'required|string|max:255',
            'postal_code' => 'required|string',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'start_date' => 'required|date',
            'course_id' => 'required|exists:courses,id',
        ]);
    
        try {
            DB::beginTransaction();
    
            // ぬいぐるみ登録
            $plushie = $user->plushie()->create([
                'name' => $validated['plushie_name'],
                'status_id' => 1,
            ]);
    
            if (!$plushie) {
                throw ValidationException::withMessages([
                    'plushie_name' => 'ぬいぐるみの登録に失敗しました。',
                ]);
            }
    
            // 予約登録
            $reservation = $user->reservation()->create([
                'plushie_id' => $plushie->id,
                'course_id' => $validated['course_id'],
                'start_date' => $validated['start_date'],
                'postal_code' => $validated['postal_code'],
                'address_line1' => $validated['address_line1'],
                'address_line2' => $validated['address_line2'],
                'phone_number' => $validated['phone_number'],
            ]);
    
            if (!$reservation) {
                throw ValidationException::withMessages([
                    'start_date' => '予約の登録に失敗しました。',
                ]);
            }
    
            DB::commit();
    
            return redirect()->route('mypage')->with('success', '予約が完了しました');
    
        } catch (\Exception $e) {
            DB::rollBack();
    
            return back()->withErrors(['error' => '登録中にエラーが発生しました: ' . $e->getMessage()]);
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
        ->get();
    
    $pastReservations = Reservation::with(['plushie.status', 'course'])
        ->where('user_id', $userId)
        ->whereHas('plushie.status', function ($query) {
            $query->where('status', '完了');
        })
        ->orderBy('start_date', 'desc')
        ->get();;
    
        return Inertia::render('User/ReserveList', [
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
            ->with('status', '予約を削除しました。');
    }
    
    public function edit(Reservation $reservation)
    {
        $reservation->load('plushie');

        return Inertia::render('User/ReserveEdit', [
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

