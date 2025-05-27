import React, { useEffect } from 'react';
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import AdminSidebarLayout from '@/Layouts/AdminSidebarLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, usePage, router } from '@inertiajs/react';
import { useForm } from "react-hook-form";
import TextInput from '@/Components/TextInput';



export default function ReservationDetail() {
    const { reservation, statuses, courses } = usePage().props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    useEffect(() => {
        if (reservation) {
            reset({
                plushie_name: reservation.plushie?.name || '',
                postal_code: reservation.postal_code || '',
                address_line1: reservation.address_line1 || '',
                address_line2: reservation.address_line2 || '',
                phone_number: reservation.phone_number || '',
                course_id: reservation.course?.id || '',
                status_id: reservation.plushie?.status?.id || '',
                start_date: reservation.start_date || '',
            });
        }
    }, [reservation]);
    
    const onSubmit = (data) => {
        router.put(route('admin.reservation.update', { reservation: reservation.id }), data, {
            onSuccess: () => {
                router.visit(route('admin.reservations'),{
                    replace: true
                }
            ); 
                
            }
        });
    };
    const handleDelete = (reservationId) => {
        if (confirm('本当にこの予約を削除しますか？')) {
            router.delete(route('admin.reservation.destroy', { reservation: reservationId }), {
                onSuccess: () => {
                    router.visit(route('admin.reservations'),{
                        replace: true
                    });
                }
            });
        }
    };

    return (
        <AdminAuthenticatedLayout>
            <Head title="予約情報の変更" />
            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex gap-2'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                            <AdminSidebarLayout />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <h3 className="h3Tit pt-5 pb-5">予約情報の変更</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-5'>
                                    <p>予約者名：{reservation.user?.name}</p>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="plushie_name">ぬいぐるみ名</label>
                                    <TextInput id="plushie_name" {...register("plushie_name", { required: "必須項目です" })} className='w-full' />
                                    {errors.plushie_name && <p className="text-red-500">{errors.plushie_name.message}</p>}
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="status_id">ぬいぐるみの状態</label>
                                    <select {...register("status_id")} defaultValue={reservation.plushie?.status?.id} className="w-full rounded-2xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                                        {statuses.map(status => (
                                            <option key={status.id} value={status.id}>{status.status}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="course_id">コース</label>
                                    <select {...register("course_id")} defaultValue={reservation.course?.id} className="w-full rounded-2xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>{course.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="start_date">予約開始日</label>
                                    <input type='date' {...register("start_date")} defaultValue={reservation.start_date} className="w-full rounded-2xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"></input>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="postal_code">郵便番号</label>
                                    <TextInput id="postal_code" {...register("postal_code", { required: "必須項目です" })} className='w-full' />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="address_line1">住所1</label>
                                    <TextInput id="address_line1" {...register("address_line1", { required: "必須項目です" })} className='w-full' />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="address_line2">住所2</label>
                                    <TextInput id="address_line2" {...register("address_line2")} className='w-full' />
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="phone_number">電話番号</label>
                                    <TextInput id="phone_number" {...register("phone_number")} className='w-full' />
                                </div>
                                <PrimaryButton type="submit">内容を更新</PrimaryButton>
                                <DangerButton className="ml-2" onClick={() => handleDelete(reservation.id)} style={{ cursor: 'pointer' }}>
                                    予約を削除
                                </DangerButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}


