import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import AdminSidebarLayout from '@/Layouts/AdminSidebarLayout'
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Dashboard() {
    return (
        <AdminAuthenticatedLayout>
            <Head title="Dashboard"/>

            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex flex-wrap'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                            <AdminSidebarLayout />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <div className='flex flex-wrap'>
                                <div className='w-1/2 p-3'>
                                    <Link href={route('admin.dashboard')} className='h-48 bg-gray-100 block border-2 p-5 rounded-xl'>
                                        管理画面トップ
                                    </Link>
                                </div>
                                <div className='w-1/2 p-3'>
                                    <Link href={route('admin.reservations')} className='h-48 bg-gray-100 block border-2 p-5 rounded-xl'>
                                        予約一覧
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
