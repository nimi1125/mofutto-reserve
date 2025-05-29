import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarLayout from '@/Layouts/SidebarLayout'
import { route } from 'ziggy-js';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useForm } from "react-hook-form";
import { router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';


export default function ReservationForm() {
    const { selectedDate, courseId } = usePage().props;

    // selectedDate が文字列の場合（YYYY-MM-DD 形式）、Date オブジェクトに変換
    const dateObject = new Date(selectedDate);

    // 日本時間で表示するためのオプション
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedSelectedDate = dateObject.toLocaleDateString('ja-JP', options);

    const defaultValues = {
        plushie_name: "",
        postal_code: "",
        address_line1: "",
        address_line2: "",
        phone_number: "",
        };
        const {
        register,
        handleSubmit,

        formState: { errors },
        } = useForm({ defaultValues });
        const nameRequired = {
            ...register("plushie_name", {
                required: "ぬいぐるみのお名前は必須です",
            }),
        };
        const postalCodeRequired = {
            ...register("postal_code", {
                required: "郵便番号は必須です",
            }),
        };
        const addressLine1Required = {
            ...register("address_line1", {
                required: "住所1は必須です",
            }),
        };
        const phoneNumberRequired = {
            ...register("phone_number", {
                required: "電話番号は必須です",
            }),
        };
        const onSubmit = (data) => {
            const payload = {
                ...data,
                start_date: selectedDate, // YYYY-MM-DD 形式の文字列をそのまま送信
                course_id: courseId,
            };
            router.post(route('reservations.store'), payload);
            };
    return (
        <AuthenticatedLayout>
            <Head title="予約情報入力"/>

            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex gap-2'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                            <SidebarLayout />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <h3 className="h3Tit pt-5 pb-5">
                                予約
                            </h3>
                            <div className='mb-5'>
                                <h4 className='mb-5'>◼︎予約情報入力</h4>
                                <p>選択された日付: {formattedSelectedDate}</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-5'>
                                    <label className='block' htmlFor="plushie_name">ぬいぐるみのお名前</label>
                                    <TextInput className='block w-full' id="plushie_name" type="text" {...nameRequired}></TextInput>
                                    <div className='text-red-400 mt-2'>{errors.plushie_name?.message}</div>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="postal_code">郵便番号</label>
                                    <TextInput className='block w-full' id="postal_code" type="text" {...postalCodeRequired}></TextInput>
                                    <div className='text-red-400 mt-2'>{errors.postal_code?.message}</div>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="address_line1">住所1（都道府県〜番地）</label>
                                    <TextInput className='block w-full' id="address_line1" type="text" {...addressLine1Required}></TextInput>
                                    <div className='text-red-400 mt-2'>{errors.address_line1?.message}</div>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="address_line2">住所2（建物名・部屋番号など）</label>
                                    <TextInput className='block w-full' id="address_line2" type="text" {...register("address_line2")}></TextInput>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="phone_number">電話番号</label>
                                    <TextInput className='block w-full' id="phone_number" type="text" {...phoneNumberRequired}></TextInput>
                                    <div className='text-red-400 mt-2'>{errors.phone_number?.message}</div>
                                </div>
                                <div>
                                    <PrimaryButton type="submit">送信</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
