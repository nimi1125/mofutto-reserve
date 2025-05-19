import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar'
import { Head } from '@inertiajs/react';

export default function ReserveHistoryList() {
    return (
        <AuthenticatedLayout>
            <Head title="ReserveHistoryList" />

            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex flex-wrap'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                            <Sidebar />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <h3 className="h3Tit pt-5 pb-5">
                                ぬいぐるみ状況確認
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
