import React, { useState } from 'react';
import { Calendar } from 'rsuite';
import { Modal, Button } from 'react-bootstrap';
import 'rsuite/Calendar/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './indexuser.css';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [petName, setPetName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [note, setNote] = useState('');
  const [timeValue, setTimeValue] = useState(dayjs('2022-04-17T15:30'));

  function handleDateSelect(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate.getTime() < today.getTime()) {
      return;
    }
    setSelectedDate(selectedDate);
    setShowModal(true);
  }

  function handleSubmit() {
    setShowModal(false);
  }

  function handleClose() {
    setName('');
    setPhone('');
    setPetName('');
    setPurpose('');
    setNote('');
    setShowModal(false);
  }

  function handleAddIconClick() {
    console.log('Add icon clicked');
  }

  return (
    <div className="main-container">
      <div className="left-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <TimePicker label="เลือกเวลาเปิด" defaultValue={dayjs('2022-04-17T15:30')} />
            <br />
            <br />
            <TimePicker label="เลือกเวลาปิด" value={timeValue} onChange={(newValue) => setTimeValue(newValue)} />
          </div>
        </LocalizationProvider>
        {/* add icon button */}
        <button onClick={handleAddIconClick} type="button" aria-label="buttonAdd" className="buttonAdd">
          <AddIcon />
        </button>
        {/* add icon save */}
        <button onClick={handleAddIconClick} type="button" aria-label="buttonSave" className="buttonsave">
          <SaveIcon />
        </button>
      </div>
      <div className="right-container">
        <div className="calendar-wrapper">
          <Calendar bordered onSelect={handleDateSelect} disabledDate={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} />
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลผู้จอง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-container">
            <p>วันที่: {selectedDate ? selectedDate.toLocaleDateString() : ''}</p>
            <input type="text" placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <br />
            <input type="text" placeholder="เบอร์โทรศัพท์" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br />
            <br />
            <input type="text" placeholder="ชื่อสัตว์" value={petName} onChange={(e) => setPetName(e.target.value)} />
            <br />
            <br />
            <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              <option value="" disabled>
                ประเภทการจอง
              </option>
              <option value="ฉีดวักซีน">ฉีดวักซีน</option>
              <option value="ฉีดยา">ฉีดยา</option>
              <option value="ตรวจร่างกาย">ตรวจร่างกาย</option>
            </select>
            <br />
            <br />
            <textarea placeholder="หมายเหตุ" value={note} onChange={(e) => setNote(e.target.value)} maxLength="150" />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            ส่ง
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
