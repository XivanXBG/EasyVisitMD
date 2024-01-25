import React, { useState, useEffect, useContext } from "react";
import styles from "./reservation.module.css";
import AuthContext from "../../contexts/AuthContext";

const ReservationModal = ({ isOpen, onClose, doctorInfo }) => {
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    type: "free",
  });

  const [appointments, setAppointments] = useState([]);
  const { loadUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/doctor/${doctorInfo?._id}/appointments`
        );
        const fetchedAppointments = await response.json();
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (isOpen) {
      fetchAppointments();
    }
  }, [doctorInfo._id, isOpen]);
 
  useEffect(() => {
    loadUserInfo().then((x) => setUserInfo(x));
    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setDate(maxDate.getDate() + 14); // Adding 14 days

    const formattedCurrentDate = currentDate.toISOString().split("T")[0];
    const formattedMaxDate = maxDate.toISOString().split("T")[0];

    const dateInput = document.getElementById("date");
    if (dateInput) {
      dateInput.min = formattedCurrentDate;
      dateInput.max = formattedMaxDate;
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(reservationData);
  };

  const handleReservation = async () => {
    if (reservationData.time === "") {
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: doctorInfo._id,
          patientId: userInfo._id,
          date: reservationData.date,
          time: reservationData.time,
          type: reservationData.type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        onClose();
      } else {
        console.error(data.message);
        // Handle reservation error on the frontend
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle other errors
    }
  };

  const handleTimeSelection = (formattedTime) => {
    setReservationData((prevData) => ({
      ...prevData,
      time: formattedTime,
    }));
  };

  const generateTimeButtons = () => {
    const isWeekend = reservationData.date
      ? [0, 6].includes(new Date(reservationData.date).getDay())
      : false;
  
    if (isWeekend) {
      return <p>Не работи през уикенда!</p>;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
   
  
    const startTime = new Date(reservationData.date);
    startTime.setHours(9, 0, 0, 0);
  
    const timeButtons = [];
  
    for (let i = 0; i < 16; i++) {
      const timeSlot = new Date(startTime.getTime() + i * 30 * 60 * 1000);
      
      const formattedTime = timeSlot.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
 
      const isAvailable = !appointments.some((appointment) => {
        const formattedAppointmentDate = formatDate(appointment.date);
        const formattedReservationDate = formatDate(reservationData.date);
      
        return (
          formattedAppointmentDate === formattedReservationDate &&
          appointment.time === formattedTime
        );
      });
  
      timeButtons.push(
        <button
          key={i}
          onClick={() => handleTimeSelection(formattedTime)}
          className={`${styles.timeButton} 
            ${isAvailable ? styles.available : styles.occupied
          } ${reservationData.time === formattedTime ? styles.selectedTime : ''}`}
        >
          {formattedTime}
        </button>
      );
    }
  
    return timeButtons;
  };
  

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Направете резервация</h2>
        <p>{`Doctor: ${doctorInfo.firstName} ${doctorInfo.family}`}</p>
        <label htmlFor="date">Date:</label>
        <input
          required
          type="date"
          id="date"
          name="date"
          onChange={handleInputChange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px 20px",
          }}
        >
          <div>
            <label htmlFor="type">Вид преглед:</label>
            <select
              className={styles.selectModal}
              name="type"
              id="type"
              onChange={handleInputChange}
            >
              <option value="free">Безплатен(направление)</option>
              <option value="paid">Платен</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          ></div>
        </div>

        {reservationData.date !== "" && (
          <div className={styles.timeButtons}>{generateTimeButtons()}</div>
        )}

        <button style={{ backgroundColor: "blue" }} onClick={handleReservation}>
          Резервирай
        </button>
      </div>
    </div>
  );
};

export default ReservationModal;
