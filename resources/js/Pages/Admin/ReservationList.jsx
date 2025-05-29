import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminSidebarLayout from '@/Layouts/AdminSidebarLayout';
import TableHeaderCell from '@/Components/TableHeaderCell';
import TableCell from '@/Components/TableCell';
import Pagination from '@/Components/Pagination';
import FlashMessage from '@/components/FlashMessage';
import { Head, Link, usePage } from '@inertiajs/react'; 
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';


export default function Reservationlist({children}) {
    const { reservation, statuses, flash } = usePage().props;
    const [statusMap, setStatusMap] = useState({});
    const [updating, setUpdating] = useState(false);

    const handleBulkUpdate = async () => {
        setUpdating(true);
        try {
            await router.post(route('admin.reservations.bulkUpdate'), { statusMap });
        } catch (error) {
            alert("更新に失敗しました");
        } finally {
            setUpdating(false);
        }
    };


    return (
        <AdminAuthenticatedLayout>
            <Head title="予約一覧"/>

            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex flex-wrap'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                                <AdminSidebarLayout />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <h3 className='h3Tit mb-5 mt-5'>予約一覧</h3>
                            <div className='mb-5'>
                                <p>住所などは詳細ページから変更お願いします。</p>
                                <p>状態については一覧から一括変更できます。変更後、一括更新ボタンを押して変更してください。</p>
                            </div>
                            <div className='mb-5'>
                            <PrimaryButton onClick={handleBulkUpdate} disabled={updating}>
                                {updating ? '更新中...' : '状態を一括更新する'}
                            </PrimaryButton>
                            </div>
                            {/* フラッシュメッセージ表示 */}
                            <div>
                                <FlashMessage />
                                {children}
                            </div>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <TableHeaderCell>ID</TableHeaderCell>
                                        <TableHeaderCell>予約者名</TableHeaderCell>
                                        <TableHeaderCell>ぬいぐるみ名</TableHeaderCell>
                                        <TableHeaderCell>状態</TableHeaderCell>
                                        <TableHeaderCell>コース</TableHeaderCell>
                                        <TableHeaderCell>開始日</TableHeaderCell>
                                        <TableHeaderCell>完了日</TableHeaderCell>
                                        <TableHeaderCell></TableHeaderCell>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservation.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">現在の予約はありません。</td>
                                        </tr>
                                    ) : (
                                        reservation.data.map(reservation => (
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
                                                    {reservation.completed_at}
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
                            {reservation.data.length > 0 && (
                                <Pagination links={reservation.links} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
