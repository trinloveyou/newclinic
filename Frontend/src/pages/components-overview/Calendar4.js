import React, { useState } from 'react';
import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';
import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';

const Calendar4 = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('');

  const handleSelectedDay = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
    // Example time ranges for each day
    switch (date.getDay()) {
      case 0: // Sunday
        setSelectedTimeRange('วันนี้ร้านปิดค่ะ คุณสามารถจองคิวได้ในวันอื่นได้ค่ะ');
        break;
      case 1: // Monday
      case 2: // Tuesday
      case 4: // Thursday
      case 5: // Friday
      case 6: // Saturday
        setSelectedTimeRange([
          '12:00 - 12:30',
          '12:30 - 13:00',
          '13:00 - 13:30',
          '13:30 - 14:00',
          '14:00 - 14:30',
          '14:30 - 15:00',
          '15:00 - 15:30',
          '15:30 - 16:00',
          '16:00 - 16:30',
          '16:30 - 17:00',
          '17:00 - 17:30',
          '17:30 - 18:00',
          '18:00 - 18:30',
          '18:30 - 19:00'
        ]);
        break;
      case 3: // Wednesday
        setSelectedTimeRange('วันนี้ร้านปิดค่ะ คุณสามารถจองคิวได้ในวันอื่นได้ค่ะ');
        break;
      default:
        setSelectedTimeRange([]);
        break;
    }
  };

  const handleTimeRangeSelect = (timeRange) => {
    setSelectedTimeRange(timeRange);
    console.log('Selected time range:', timeRange);
  };

  return (
    <div>
      <ReactHorizontalDatePicker selectedDay={handleSelectedDay} enableScroll={true} enableDays={180} color={'#987876'} />
      {selectedDate && (
        <div>
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
          {typeof selectedTimeRange === 'string' ? (
            <p>{selectedTimeRange}</p>
          ) : (
            <div>
              <p>Select Time Range:</p>
              {selectedTimeRange.map((timeRange, index) => (
                <button key={index} onClick={() => handleTimeRangeSelect(timeRange)} style={{ marginRight: '5px' }}>
                  {timeRange}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar4;
