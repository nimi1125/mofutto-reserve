import React from 'react'
import { usePage, Link } from '@inertiajs/react';
import RoundedEmeraldBtn from '@/Components/RoundedEmeraldBtn'
import { route } from 'ziggy-js';

export default function ReserveCourseLayout() {
    const { courses } = usePage().props;

    return (
        <ul>
        {courses.map(course => (
            <li key={course.id} className="border-4 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <p>日数: {course.duration_days}日</p>
                <p className='mb-3'>説明: {course.description}</p>
                <Link href={route('ReserveCalendar', { courseId: course.id })}>
                    <RoundedEmeraldBtn text="選択" />
                </Link>
            </li>
        ))}
        </ul>
    )
}


