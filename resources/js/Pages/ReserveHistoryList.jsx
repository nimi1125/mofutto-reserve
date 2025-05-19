import { usePage, Link } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import axios from 'axios';
import { route } from 'ziggy-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import RoundedEmeraldBtn from '@/Components/RoundedEmeraldBtn';

export default function ReserveHistoryList() {
    const { currentReservations, pastReservations } = usePage().props;

    const handleDelete = (reservationId) => {
        if (confirm('本当にこの予約を削除しますか？')) {
            router.delete(route('reserveDestroy', { reservationId: reservationId }));
        }
    };

    const statusColor = {
        '受付済': 'text-yellow-800 font-semibold',
        '治療中': 'text-blue-800 font-semibold',
        '完了': 'text-green-800 font-semibold',
      };
        
    return (
        <AuthenticatedLayout>
            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex gap-2'>
                        <div className='hidden md:block md:w-1/4 px-2'><Sidebar /></div>
                        <div className='w-full md:w-3/4 px-4'>

                            <h3 className="h3Tit pt-5 pb-5">予約履歴一覧</h3>

                            {/* ◼︎現在の予約一覧 */}
                            <section className='mb-10'>
                                <h4 className='mb-5'>◼︎現在の予約一覧</h4>
                                {currentReservations.length === 0 ? (
                                    <p>現在の予約はありません。</p>
                                ) : (
                                    currentReservations.map(reservation => (
                                        <div key={reservation.id} className='border-4 p-4 mb-4 flex'>
                                            <div className='flex-1'>
                                                <p>予約日：{reservation.start_date}</p>
                                                <p>ぬいぐるみ名：{reservation.plushie?.name}</p>
                                                <p>ぬいぐるみの状態：
                                                    <span className={`${statusColor[reservation.plushie?.status?.status]}`}>
                                                        {reservation.plushie?.status?.status}
                                                    </span>
                                                </p>
                                                <p>予約コース：{reservation.course?.name}</p>
                                            </div>
                                            <div className='flex flex-col'>
                                            <Link
                                                href={route('reserveEdit', { reservation: reservation.id })}
                                                className='mb-2'
                                                >
                                                <RoundedEmeraldBtn text="変更" />
                                            </Link>
                                            <button onClick={() => handleDelete(reservation.id)} style={{ cursor: 'pointer' }}>
                                                削除
                                            </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </section>

                            {/* ◼︎過去の予約一覧 */}
                            <section>
                                <h4 className='mb-5'>◼︎過去の予約一覧</h4>
                                {pastReservations.length === 0 ? (
                                    <p>過去の予約はありません。</p>
                                ) : (
                                    pastReservations.map(reservation => (
                                        <div key={reservation.id} className='border-4 p-4 mb-4 flex'>
                                            <div className='flex-1'>
                                                <p>予約日：{reservation.start_date}</p>
                                                <p>ぬいぐるみ名：{reservation.plushie?.name}</p>
                                                <p>ぬいぐるみの状態：
                                                    <span className={`${statusColor[reservation.plushie?.status?.status]}`}>
                                                        {reservation.plushie?.status?.status}
                                                    </span>
                                                </p>
                                                <p>予約コース：{reservation.course?.name}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
