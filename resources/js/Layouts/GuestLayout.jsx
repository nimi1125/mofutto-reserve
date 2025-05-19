import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white pt-6 sm:justify-center sm:pt-0">
            <div>
                <h1 className='h1Tit zenMaru ml-5 pt-3 text-emerald-600'>もふっと予約</h1>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white border-emerald-400 border-2 px-6 py-4 sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
