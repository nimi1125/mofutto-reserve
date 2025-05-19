import { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import ReserveCalendarArea from '@/Components/ReserveCalendarArea';
import RoundedEmeraldBtn from '@/Components/RoundedEmeraldBtn';
import { Head } from '@inertiajs/react';

export default function ReserveCalendar() {
  const { courseId, course, calendarData } = usePage().props;
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const goToNext = () => {
    if (!selectedDate) {
      alert("日付を選んでください");
      return;
    }

    // 選択した日付を YYYY-MM-DD 形式の文字列に整形
    const formattedDate = selectedDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });

    router.visit(route('reserveForm', {
      selectedDate: selectedDate,
      courseId: courseId,
    }));
  };

  return (
    <AuthenticatedLayout>
      <Head title="ReserveCalendar"/>
      <div className="pt-0 py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className='flex gap-2'>
            <div className='hidden md:block md:w-1/4 px-2'>
              <Sidebar />
            </div>
            <div className='w-full md:w-3/4 px-4'>
              <h3 className="h3Tit pt-5 pb-5">予約</h3>
              <div>
                <h4 className='mb-5'>◼︎日付選択</h4>
                <p>ぬいぐるみを預ける日を選択してください。</p>
                <p className='mb-5'>※選択するのは、預け始める日（例）5/1から5/5まで預ける場合、5/1のみ選択）</p>
                <p>選択中のコース：{course.name}</p>
                <p>選択中のコースID：{courseId}</p>
                <div className='mb-5'>
                  <div className='border-2 mb-5'>
                    <ReserveCalendarArea
                      onSelectDate={handleSelectDate}
                      calendarData={calendarData}
                    />
                  </div>
                  <RoundedEmeraldBtn text="日付選択して次へ" onClick={goToNext} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}