import React, { useState } from 'react';
import { Container, Typography, Grid, Button, TextField } from '@mui/material';
import Canlender4 from './Calendar4';
import './Calendar.css';

export default function AppointmentBooking() {
  const [customerName, setCustomerName] = useState('');
  const [petName, setPetName] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // ตัวอย่างข้อมูลช่วงเวลาที่สามารถจองได้ (ซึ่งจะต้องดึงจาก API จริงในการใช้งานจริง)
  const timeSlots = [
    { id: '1', startTime: '09:00', endTime: '09:30' },
    { id: '2', startTime: '09:30', endTime: '10:00' },
    { id: '3', startTime: '10:00', endTime: '10:30' }
    // เพิ่มข้อมูลช่วงเวลาที่เหลือตามต้องการ
  ];

  const handleBooking = () => {
    // ตัวอย่างการส่งข้อมูลการจอง (จะต้องเชื่อมต่อ API จริงในการใช้งานจริง)
    console.log(`Booking appointment for ${customerName} with pet ${petName} at time slot ${selectedTimeSlot}`);
    // ส่วนการเชื่อมต่อ API จะต้องเขียนเพิ่มเอง
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        จองคิวรักษาสัตว์
      </Typography>
      <div className="main-container">
        <Canlender4 />
      </div>
      <div className="secondary-container">
        <Typography variant="h4" gutterBottom>
          เลือกช่วงเวลา
        </Typography>
        <Grid container spacing={2}>
          {timeSlots.map((slot) => (
            <Grid item key={slot.id} xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                className="time-slot-button"
                onClick={() => setSelectedTimeSlot(slot.id)}
                disabled={selectedTimeSlot === slot.id}
              >
                {`${slot.startTime} - ${slot.endTime}`}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" gutterBottom>
          รายละเอียดการจอง
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ชื่อลูกค้า"
              variant="outlined"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="ชื่อสัตว์เลี้ยง" variant="outlined" value={petName} onChange={(e) => setPetName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleBooking} disabled={!customerName || !petName || !selectedTimeSlot}>
              จอง
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
