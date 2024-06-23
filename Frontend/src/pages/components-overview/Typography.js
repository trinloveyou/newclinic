import React, { useState } from 'react';
// import FullCalendarApp from './Calendar';
import Canlender4 from './Calendar4';
// import './styles.css';
import './Calendar.css';

export default function Typohraphy() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
    console.log('Form submitted:', { name, email, message });
    // Optionally, reset form fields or close modal after submission
    setName('');
    setEmail('');
    setMessage('');
    setShowModal(false); // Close modal after submission
  };

  return (
    <div className="main-container">
      <h1>จองคิวรักษาสัตว์</h1>
      {/* <FullCalendarApp /> */}
      <Canlender4 />

      <div className="secondary-container circular-container">
        <h2>Additional Information</h2>
        <p>Here you can add more content or another component as needed.</p>
        <button className="custom-button" onClick={handleOpenModal}>
          Open Form
        </button>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={handleCloseModal}>
                &times;
              </button>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
