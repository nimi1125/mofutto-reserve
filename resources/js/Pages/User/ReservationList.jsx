import { Head, usePage, Link } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import axios from 'axios';
import { route } from 'ziggy-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarLayout from '@/Layouts/SidebarLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Pagination from '@/Components/Pagination';
import FlashMessage from '@/components/FlashMessage';


export default function ReservationList({children}) {
    const { currentReservations, pastReservations } = usePage().props;

    const handleDelete = (reservationId) => {
        if (confirm('本当にこの予約を削除しますか？')) {
            router.delete(route('reservation.destroy', { reservationId: reservationId }));
        }
    };

    const statusColor = {
        '受付済': 'text-yellow-800 font-semibold',
        '治療中': 'text-blue-800 font-semibold',
        '完了': 'text-green-800 font-semibold',
      };
        
    return (
        <AuthenticatedLayout>
            <Head title="予約履歴一覧"/>
            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex gap-2'>
                        <div className='hidden md:block md:w-1/4 px-2'><SidebarLayout /></div>
                        <div className='w-full md:w-3/4 px-4'>

                            <h3 className="h3Tit pt-5 pb-5">予約履歴一覧</h3>
                            <div>
                                <FlashMessage />
                                {children}
                            </div>
                            {/* ◼︎現在の予約一覧 */}
                            <section className='mb-10'>
                                <h4 className='mb-5'>◼︎現在の予約一覧</h4>
                                <p className='text-red-400 font-bold mb-5'>コース、予約開始日などは変更できません。そのため一度予約を削除してから、予約の取り直しをお願いします。</p>
                                {currentReservations.data.length === 0 ? (
                                    <p>現在の予約はありません。</p>
                                ) : (
                                    currentReservations.data.map(reservation => (
                                        <div key={reservation.id} className='border-4 p-4 mb-4 flex'>
                                            <div className='flex-1'>
                                                <p>予約日：{reservation.start_date}</p>
                                                <p>ぬいぐるみ名：{reservation.plushie?.name}</p>
                                                <p>現在の状態：
                                                    <span className={`${statusColor[reservation.plushie?.status?.status]}`}>
                                                        {reservation.plushie?.status?.status}
                                                    </span>
                                                </p>
                                                <p>予約コース：{reservation.course?.name}</p>
                                                <p>完了予定日：{reservation.completed_at}</p>
                                            </div>
                                            <div className='flex flex-col'>
                                            <Link
                                                href={route('reservation.edit', { reservation: reservation.id })}
                                                className='mb-2'
                                                >
                                                <PrimaryButton>変更</PrimaryButton>
                                            </Link>
                                            <DangerButton onClick={() => handleDelete(reservation.id)} style={{ cursor: 'pointer' }}>
                                                削除
                                            </DangerButton>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {currentReservations.data.length > 0 && (
                                    <Pagination links={currentReservations.links} />
                                )}
                            </section>

                            {/* ◼︎過去の予約一覧 */}
                            <section>
                                <h4 className='mb-5'>◼︎過去の予約一覧</h4>
                                {pastReservations.data.length === 0 ? (
                                    <p>過去の予約はありません。</p>
                                ) : (
                                    pastReservations.data.map(reservation => (
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
                                {pastReservations.data.length > 0 && (
                                    <Pagination links={pastReservations.links} />
                                )}
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
