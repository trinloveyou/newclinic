import React, { useState } from 'react';
import ReactHorizontalDatePicker from 'react-horizontal-strip-datepicker';
import 'react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css';
import Modal from 'react-modal';
import './Calendar.css'; // Import CSS file for styling
import axios from 'axios';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Calendar4 = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', appointmentType: '', selectedTime: '' });

  const handleSelectedDay = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
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

  const acceptqueue = async () => {
    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      type: formData.appointmentType,
      time: formData.selectedTime,
      date: selectedDate
    };

    // ส่งข้อมูลไปยัง API
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8000/api/booking', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('จองคิวสำเร็จ');
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการจองคิว');
    }
  };

  const handleTimeRangeSelect = (timeRange) => {
    setSelectedTimeRange(timeRange);
    setFormData({ ...formData, selectedTime: timeRange }); // Update selectedTime in formData
    console.log('Selected time range:', timeRange);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <ReactHorizontalDatePicker selectedDay={handleSelectedDay} enableScroll={true} enableDays={180} color={'#987876'} />
      {selectedDate && (
        <div>
          <p>วันที่จอง{selectedDate.toLocaleDateString()}</p>
          {typeof selectedTimeRange === 'string' ? (
            <p>{selectedTimeRange}</p>
          ) : (
            <div>
              <p>เลือกช่วงเวลาที่ต้องการจอง</p>
              {selectedTimeRange.map((timeRange, index) => (
                <button key={index} onClick={() => handleTimeRangeSelect(timeRange)} style={{ marginRight: '5px', marginTop: '10px' }}>
                  {timeRange}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Input Form"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-container">
          <h2>กรอกข้อมูล</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              ชื่อ:
              <br />
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </label>
            <br />
            <label>
              เบอร์โทร:
              <br />
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            </label>
            <br />
            <label>
              อีเมล:
              <br />
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </label>
            <br />
            <label>
              ประเภทการจอง:
              <br />
              <select
                value={formData.appointmentType}
                onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                required
              >
                <option disabled value="">
                  โปรดเลือก
                </option>
                <option value="Consultation">ฉีดวีกซีน</option>
                <option value="Treatment">ตรวจร่างกายทั่วไป</option>
                <option value="Checkup">ตรวจเลือด/x-ray</option>
              </select>
            </label>
            <br />
            {formData.selectedTime && <p>เวลาที่เลือก: {formData.selectedTime}</p>}
            <br />
            <button type="submit" onClick={acceptqueue}>
              ยืนยัน
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              ยกเลิก
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar4;
