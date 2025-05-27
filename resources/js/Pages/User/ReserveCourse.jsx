import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarLayout from '@/Layouts/SidebarLayout'
import ReserveCourseLayout from '@/Layouts/ReserveCourseLayout'
import { Head } from '@inertiajs/react';

export default function ReserveCourse() {
    return (
        <AuthenticatedLayout>
            <Head title="ReserveCourse" />

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
                                <ReserveCourseLayout />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
