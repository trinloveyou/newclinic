import React from 'react';
// import FullCalendarApp from './Calendar';
import Canlender4 from './Calendar4';
// import './styles.css';
import './Calendar.css';

export default function Typography() {
  return (
    <>
      <div className="main-container">
        <h1>จองคิวรักษาสัตว์</h1>
        {/* <FullCalendarApp /> */}
        <Canlender4 />
      </div>

      <div className="secondary-container">
        <h1>A</h1>
        <button className="time-slot-button" disabled>
          8:00 - 8:30
        </button>
        <button className="time-slot-button">9:00 - 9:30</button>
        <button className="time-slot-button">10:00 - 10:30</button>
      </div>
    </>
  );
}
