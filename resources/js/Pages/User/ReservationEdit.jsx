import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useForm } from "react-hook-form";
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';



export default function ReservationEdit() {
    const { reservation } = usePage().props;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    useEffect(() => {
        if (reservation) {
            reset({
                plushie_name: reservation.plushie_name || '',
                postal_code: reservation.postal_code || '',
                address_line1: reservation.address_line1 || '',
                address_line2: reservation.address_line2 || '',
                phone_number: reservation.phone_number || '',
            });
        }
    }, [reservation]);
    
    const onSubmit = (data) => {
        router.put(route('reservation.update', { reservation: reservation.id }), data);
    };

    return (
        <AuthenticatedLayout>
            <Head title="予約情報の変更"/>
            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex gap-2'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                            <SidebarLayout />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <h3 className="h3Tit pt-5 pb-5">予約情報の変更</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-5'>
                                    <label htmlFor="plushie_name">ぬいぐるみのお名前</label>
                                    <TextInput id="plushie_name" {...register("plushie_name", { required: "必須項目です" })} className='w-full' />
                                    {errors.plushie_name && <p className="text-red-500">{errors.plushie_name.message}</p>}
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
                                <PrimaryButton type="submit">更新する</PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
