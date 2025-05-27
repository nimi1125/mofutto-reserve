import React from 'react'
import { Link } from '@inertiajs/react'

export default function AdminSidebarLayout() {
    return (
        <nav>
            <ul className="md:h-screen">
                <li className="p-5 border-b-2 border-emerald-700">
                    <Link href={route('admin.dashboard')}>
                        管理画面トップ
                    </Link>
                    
                </li>
                <li className="p-5 border-b-2 border-emerald-700">
                    <Link href={route('admin.reservations')}>
                        予約一覧
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
