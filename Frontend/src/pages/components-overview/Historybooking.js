import React from 'react';
import './historybooking.css';

const Historybooking = () => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th className="headerCell">วันที่จอง</th>
            <th className="headerCell">เวลาจอง</th>
            <th className="headerCell">จองคิวรักษาอะไร</th>
            <th className="headerCell">ที่สัตว์ที่เข้าทำการรักษา</th>
            <th className="headerCell">สถานะดำเนินการ</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Historybooking;
