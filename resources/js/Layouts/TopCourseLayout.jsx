import React from 'react'
import { usePage, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton'
import { route } from 'ziggy-js';

export default function TopCourseLayout() {
    const { courses = [] } = usePage().props;

    return (
        <ul className="grid grid-cols-2 gap-4 mb-8">
        {courses.map(course => (
            <li  key={course.id}  className='border-emerald-100 border-4 rounded-xl p-8'>
                <h3 className='h3Tit zenMaru text-center mb-5'>
                    {course.name}
                </h3>
                <p className='mb-5'> {course.description}</p>
                <div className='text-center'>
                <Link href={route('reserve.calendar', { courseId: course.id })}>
                    <PrimaryButton>
                        このコースを選択して予約
                    </PrimaryButton>
                </Link>
                </div>
            </li>
        ))}
        </ul>
    )
}


