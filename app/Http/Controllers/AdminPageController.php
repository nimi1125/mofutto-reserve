<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Reservation;
use App\Models\PlushieStatus;
use Inertia\Inertia;

class AdminPageController extends Controller
{
    public function index() {
        // 管理者ダッシュボード画面
        return Inertia::render('Admin/Dashboard');
    }

    public function reserveList() {
        // 予約の一覧表示
        $reservation = Reservation::with(['plushie.status', 'course', 'user'])
        ->orderBy('start_date', 'asc')
        ->paginate(20);
        $statuses = PlushieStatus::all();
        $courses = Course::all();

        return Inertia::render('Admin/AdminReservationList', [
            'reservation' => $reservation,
            'statuses' => $statuses,
            'courses' => $courses,
        ]);
    }

    public function bulkUpdate(Request $request)
    {
        foreach ($request->statusMap as $reservationId => $statusId) {
            $reservation = Reservation::with('plushie')->find($reservationId);
            if ($reservation && $reservation->plushie) {
                $reservation->plushie->status_id = $statusId;
                $reservation->plushie->save();
            }
        }
    
        return redirect()->route('admin.reservations')->with('updateMessage', '状態を一括更新しました。');
    }

    public function showReserve($reservation) {
        // 予約詳細ページ＋編集可能UI（ぬいぐるみ状態含む）
        $statuses = PlushieStatus::all();
        $courses = Course::all();
        $reservation = Reservation::with(['plushie.status', 'course', 'user'])->findOrFail($reservation);

        return Inertia::render('Admin/AdminReservationEdit', [
            'reservation' => $reservation,
            'statuses' => $statuses,
            'courses' => $courses,
        ]);
    }

    public function updateReserve(Request $request, $reservation) {
        // 予約の情報を更新（状態など）
        $request->validate([
            'plushie_name' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'phone_number' => 'required|string|max:20',
            'status_id' => 'required|exists:plushie_statuses,id',
        ]);
    
        $reservation = Reservation::with('plushie')->findOrFail($reservation);
        $reservation->postal_code = $request->postal_code;
        $reservation->address_line1 = $request->address_line1;
        $reservation->address_line2 = $request->address_line2;
        $reservation->phone_number = $request->phone_number;
        $reservation->completed_at = $request->completed_at;
        $reservation->save();
    
        $plushie = $reservation->plushie;
        $plushie->name = $request->plushie_name;
        $plushie->status_id = $request->status_id;
        $plushie->save();
    
        return redirect()->route('admin.reservations')->with('updateMessage', '予約内容を更新しました。');
    }

    public function destroy(string $reservation)
    {
        $reservation = Reservation::find($reservation);
    
        if (!$reservation) {
            return redirect()->route('admin.reservations')
            ->with('error', '予約を削除しました。');
        }
    
        $reservation->delete();
    
        return redirect()->route('admin.reservations')
        ->with('deleteMessage', '予約を削除しました。');
    }
}

