import React, { useState } from 'react';
import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';
import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';

const Calendar4 = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectedDay = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };

  return (
    <div>
      <ReactHorizontalDatePicker selectedDay={handleSelectedDay} enableScroll={true} enableDays={180} color={'#987876'} />
      {selectedDate && <p>Selected Date: {selectedDate.toLocaleDateString()}</p>}
    </div>
  );
};

export default Calendar4;
