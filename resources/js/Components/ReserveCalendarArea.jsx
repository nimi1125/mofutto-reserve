import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function ReserveCalendarArea({ onSelectDate, calendarData }) {
  const [value, setValue] = useState();

  const formatDate = (date) =>
    date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' }); 

  useEffect(() => {
    if (value) {
      onSelectDate(value);
    }
  }, [value, onSelectDate]);

  const statusToMark = {
    available: '○',
    few: '△',
    full: '×',
  };

  const dateStatusMap = {}; 

  if (calendarData && typeof calendarData === 'object' && !Array.isArray(calendarData)) {
    Object.entries(calendarData).forEach(([date, status]) => {
      dateStatusMap[date] = status;
    });
  }

  return (
    <div className='calendarBox'>
      <Calendar
        value={value}
        onClickDay={(e) => setValue(e)}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const formattedDate = formatDate(date); 
            const status = dateStatusMap[formattedDate];
            if (status) {
              return <span className='block font-semibold text-2xl'>{statusToMark[status]}</span>;
            }
          }
          return null;
        }}
      />
    </div>
  );
}
