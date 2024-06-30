import React, { useState } from 'react';
import { Container, Typography as MuiTypography, Grid, Button } from '@mui/material';
import Calendar4 from './Calendar4';
import './Calendar.css';

const TypographyPage = () => {
  const [selectedDay, setSelectedDay] = useState('Monday'); // State เก็บวันที่ที่เลือก

  const timeSlots = {
    Monday: ['09:00-10:00', '10:00-11:00', '14:00-15:00'],
    Tuesday: ['09:00-10:00', '11:00-12:00', '13:00-14:00'],
    Wednesday: ['10:00-11:00', '12:00-13:00', '15:00-16:00'],
    Thursday: ['08:00-09:00', '10:00-11:00', '13:00-14:00'],
    Friday: ['09:00-10:00', '11:00-12:00', '14:00-15:00']
  };

  const handleBooking = () => {
    // ตรงนี้จะเขียนโค้ด Logic สำหรับการจอง
    console.log(`Booking slot for ${selectedDay}`);
  };

  console.log('timeSlots', timeSlots);

  return (
    <Container maxWidth="md">
      <MuiTypography variant="h3" align="center" gutterBottom>
        จองคิวรักษาสัตว์
      </MuiTypography>
      <div className="main-container">
        <Calendar4 timeSlots={timeSlots} />
      </div>
      <div className="secondary-container">
        <MuiTypography variant="h4" gutterBottom>
          เลือกช่วงเวลา
        </MuiTypography>
        <div>
          {/* เพิ่มเลือกวันที่ไว้ที่นี่ */}
          <div style={{ marginBottom: '1rem' }}>
            <MuiTypography variant="subtitle1" gutterBottom>
              เลือกวันที่:
            </MuiTypography>
            <Button variant="outlined" onClick={() => setSelectedDay('Monday')} style={{ marginRight: '1rem' }}>
              จันทร์
            </Button>
            <Button variant="outlined" onClick={() => setSelectedDay('Tuesday')} style={{ marginRight: '1rem' }}>
              อังคาร
            </Button>
            <Button variant="outlined" onClick={() => setSelectedDay('Wednesday')} style={{ marginRight: '1rem' }}>
              พุธ
            </Button>
            <Button variant="outlined" onClick={() => setSelectedDay('Thursday')} style={{ marginRight: '1rem' }}>
              พฤหัสบดี
            </Button>
            <Button variant="outlined" onClick={() => setSelectedDay('Friday')} style={{ marginRight: '1rem' }}>
              ศุกร์
            </Button>
          </div>
          <h2>{selectedDay}</h2>
          <ul>
            {timeSlots[selectedDay].map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>
        <MuiTypography variant="h4" gutterBottom>
          รายละเอียดการจอง
        </MuiTypography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={handleBooking}>
              จอง
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default TypographyPage;
