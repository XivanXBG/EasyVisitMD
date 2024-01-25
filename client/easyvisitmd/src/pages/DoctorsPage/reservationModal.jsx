import React, { useState } from 'react';
import styles from './reservation.module.css';

const ReservationModal = ({ isOpen, onClose, doctorInfo }) => {
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservation = () => {
    console.log('Reservation data:', reservationData);
    onClose();
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2>Make a Reservation</h2>
        <p>{`Doctor: ${doctorInfo.name} ${doctorInfo.family}`}</p>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" onChange={handleInputChange} />

        <label htmlFor="time">Time:</label>
        <input type="time" id="time" name="time" onChange={handleInputChange} />

        <button onClick={handleReservation}>Reserve</button>
      </div>
    </div>
  );
};

export default ReservationModal;
