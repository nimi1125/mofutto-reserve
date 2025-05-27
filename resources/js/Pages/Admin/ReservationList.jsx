import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton'
import AdminSidebarLayout from '@/Layouts/AdminSidebarLayout'
import TableHeaderCell from '@/Components/TableHeaderCell';
import TableCell from '@/Components/TableCell';
import { Head, Link, usePage } from '@inertiajs/react'; 
import { useEffect, useState } from 'react'
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';


export default function Reservationlist() {
    const { reservation, statuses, flash } = usePage().props;
    const [statusMap, setStatusMap] = useState({});
    
    console.log("FLASH", flash);

    const handleBulkUpdate = () => {
        router.post(route('admin.reservations.bulkUpdate'), { statusMap });
    };

    const [message, setMessage] = useState(null);

    useEffect(() => {
        // 初期表示時にだけ flash をセット（null で上書きしない）
        if ((flash.updateMessage || flash.deleteMessage || flash.error) && !message) {
            setMessage({
                updateMessage: flash.updateMessage,
                deleteMessage: flash.deleteMessage,
                error: flash.error
            });

            const timer = setTimeout(() => {
                setMessage(null);
            }, 50000);

            return () => clearTimeout(timer);
        }
    }, [flash, message]);

    return (
        <AdminAuthenticatedLayout>
            <Head title="Reservationlist"/>

            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex flex-wrap'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                                <AdminSidebarLayout />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <h3 className='h3Tit mb-5 mt-5'>予約一覧</h3>
                            <div className='mb-5'>
                                <p>住所、コースなどは詳細ページから変更お願いします。</p>
                                <p>状態については一覧から一括変更できます。変更後、一括更新ボタンを押して変更してください。</p>
                            </div>
                            <div className='mb-5'>
                            <PrimaryButton onClick={handleBulkUpdate}>
                                状態を一括更新する
                            </PrimaryButton>
                            </div>
                            {/* フラッシュメッセージ表示 */}
                            {message?.updateMessage && (
                                <div className="mb-4 p-3 bg-emerald-100 text-emerald-700 rounded">
                                    {message.updateMessage}
                                </div>
                            )}
                            {message?.deleteMessage && (
                                <div className="mb-4 p-3 bg-gray-100 text-gray-700 rounded">
                                    {message.deleteMessage}
                                </div>
                            )}
                            {message?.error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                    {message.error}
                                </div>
                            )}
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <TableHeaderCell>ID</TableHeaderCell>
                                        <TableHeaderCell>予約者名</TableHeaderCell>
                                        <TableHeaderCell>ぬいぐるみ名</TableHeaderCell>
                                        <TableHeaderCell>状態</TableHeaderCell>
                                        <TableHeaderCell>コース</TableHeaderCell>
                                        <TableHeaderCell>開始日</TableHeaderCell>
                                        <TableHeaderCell></TableHeaderCell>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservation.length === 0 ? (
                                        <tr>
                                            <td colSpan="10" className="text-center py-4">現在の予約はありません。</td>
                                        </tr>
                                    ) : (
                                        reservation.map(reservation => (
                                            <tr key={reservation.id} className="even:bg-gray-50">
                                                <TableCell>
                                                    {reservation.id}
                                                </TableCell>

                                                <TableCell>
                                                    {reservation.user?.name}
                                                </TableCell>

                                                <TableCell>
                                                    {reservation.plushie?.name}
                                                </TableCell>

                                                <TableCell>
                                                    <select
                                                        value={(statusMap[reservation.id] ?? reservation.plushie?.status?.id) || ''}
                                                        onChange={(e) =>
                                                        setStatusMap({ ...statusMap, [reservation.id]: e.target.value })
                                                        }
                                                        className="border rounded"
                                                    >
                                                        {statuses.map(status => (
                                                        <option key={status.id} value={status.id}>
                                                            {status.status}
                                                        </option>
                                                        ))}
                                                    </select>
                                                </TableCell>

                                                <TableCell>
                                                    {reservation.course?.name}
                                                </TableCell>

                                                <TableCell>
                                                    {reservation.start_date}
                                                </TableCell>

                                                <TableCell>
                                                    <Link href={route('admin.reservation.show', { id: reservation.id })}>
                                                        <PrimaryButton>
                                                            詳細
                                                        </PrimaryButton>
                                                    </Link>
                                                </TableCell>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
