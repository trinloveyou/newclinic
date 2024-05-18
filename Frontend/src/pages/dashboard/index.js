// App.js
import React, { useState } from 'react';
import { Calendar } from 'rsuite';
import { Modal, Button } from 'react-bootstrap';
import 'rsuite/Calendar/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to handle date selection
  function handleDateSelect(date) {
    // Get the current date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  
    // Get the selected date without time
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  
    // Check if the selected date is after today
    if (selectedDate.getTime() < today.getTime()) {
      return; // Do nothing if the selected date is after today
    }
  
    setSelectedDate(selectedDate);
    setShowModal(true);
  }
  
  function handleSubmit() {
    setShowModal(false);
  }

  return (
    <div className="container">
      <div className="calendar-wrapper">
        <Calendar bordered onSelect={handleDateSelect} />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>วันที่: {selectedDate ? selectedDate.toLocaleDateString() : ''}</p>

          <input type="text" placeholder="Name" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
