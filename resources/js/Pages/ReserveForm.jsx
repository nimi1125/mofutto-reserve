import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar'
import { route } from 'ziggy-js';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useForm } from "react-hook-form";
import { router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';


export default function ReserveForm() {
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
            <Head title="ReserveCalendar"/>

            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex gap-2'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                            <Sidebar />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <h3 className="h3Tit pt-5 pb-5">
                                予約
                            </h3>
                            <div className='mb-5'>
                                <h4 className='mb-5'>◼︎予約情報入力</h4>
                                <p>選択された日付: {formattedSelectedDate}</p>
                                <p>選択されたコース: {courseId}</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-5'>
                                    <label className='block' htmlFor="plushie_name">ぬいぐるみのお名前</label>
                                    <TextInput className='block w-full' id="plushie_name" type="text" {...nameRequired}></TextInput>
                                    <div>{errors.plushie_name?.message}</div>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="postal_code">郵便番号</label>
                                    <TextInput className='block w-full' id="postal_code" type="text" {...register("postal_code", { required: "郵便番号は必須です" })}></TextInput>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="address_line1">住所（都道府県〜市区町村）</label>
                                    <TextInput className='block w-full' id="address_line1" type="text" {...register("address_line1", { required: "住所1は必須です" })}></TextInput>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="address_line2">住所（建物名・部屋番号など（任意））</label>
                                    <TextInput className='block w-full' id="address_line2" type="text" {...register("address_line2")}></TextInput>
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="phone_number">電話番号（任意。配送連絡用など）</label>
                                    <TextInput className='block w-full' id="phone_number" type="text" {...register("phone_number")}></TextInput>
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
