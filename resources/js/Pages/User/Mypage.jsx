import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarLayout from '@/Layouts/SidebarLayout'
import FlashMessage from '@/Components/FlashMessage';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Mypage({children}) {
    return (
        <AuthenticatedLayout>
            <Head title="マイページ"/>

            <div className="pt-0 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex flex-wrap'>
                        <div className='hidden md:block md:w-1/4 px-2'>
                            <SidebarLayout />
                        </div>
                        <div className='w-full md:w-3/4 px-4'>
                            <div>
                                <FlashMessage />
                                {children}
                            </div>
                            <div className='flex flex-wrap'>
                                <div className='w-1/2 p-3'>
                                    <Link href={route('mypage')} className='h-48 bg-gray-100 block border-2 p-5 rounded-xl'>
                                        マイページ
                                    </Link>
                                </div>
                                <div className='w-1/2 p-3'>
                                    <Link href={route('reservation.course')} className='h-48 bg-gray-100 block border-2 p-5 rounded-xl'>
                                        予約
                                    </Link>
                                </div>
                                <div className='w-1/2 p-3'>
                                    <Link href={route('reservations')} className='h-48 bg-gray-100 block border-2 p-5 rounded-xl'>
                                        予約履歴一覧
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
