import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarLayout from '@/Layouts/SidebarLayout'
import ReservationCourseLayout from '@/Layouts/ReservationCourseLayout'
import { Head } from '@inertiajs/react';

export default function ReservationCourse() {
    return (
        <AuthenticatedLayout>
            <Head title="コース選択" />

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
                            <h4 className='mb-5'>◼︎コース選択</h4>
                            <p className='mb-5'>各コースの日数は完了までの目安です。予約の混み具合やぬいぐるみの状態により日数は変動します。</p>
                            <ReservationCourseLayout />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
