import React from 'react'
import { Link } from '@inertiajs/react'

export default function SidebarLayout() {
    return (
        <nav>
            <ul className="md:h-screen">
                <li className="p-5 border-b-2">
                    <Link href={route('mypage')}>
                        マイページ
                    </Link>
                    
                </li>
                <li className="p-5 border-b-2">
                    <Link href={route('reservation.course')}>
                        予約
                    </Link>
                </li>
                <li className="p-5 border-b-2">
                    <Link href={route('reservations')}>予約履歴一覧</Link>
                </li>
            </ul>
        </nav>
    )
}
