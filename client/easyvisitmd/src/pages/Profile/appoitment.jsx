import React from "react";
import "./appoitment.css"; // Make sure to import your stylesheet
import {useNavigate} from 'react-router-dom'
const deleteHanlder = async(id) => {
    await fetch("http://localhost:5000/deleteReservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    body: JSON.stringify({ userId: id }), // Send data as JSON
  });
  
};
function normalizeDate(dateString) {
    const dateObject = new Date(dateString);
    const normalizedDateString = dateObject.toISOString().split('T')[0];
    return normalizedDateString;
  }
  
const AppointmentCard = ({ doctorInfo, time, type, date, _id }) => {
    const navigate = useNavigate();
  return (
    <>
      <div className="cardR">
        <div className="infoD">
          <div className="doctor-name">
            <b>Doctor:</b>
            {doctorInfo.firstName} {doctorInfo.family}
          </div>
          <div className="info">
            <b>Location:</b> {doctorInfo.location}
          </div>
          <div className="info">
            <b>Specialty:</b> {doctorInfo.specialty}
          </div>
        </div>
        <div className="infoR">
          <div className="info">
            <b>Date:</b> {normalizeDate(date)}
          </div>
          <div className="info">
            <b>Time:</b> {time}
          </div>
          <div className="info">
            <b>Type:</b> {type}
          </div>
        </div>
        <button
          onClick={()=>{deleteHanlder(_id);navigate('/')}}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "8px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        >
          Изтрий
        </button>
      </div>
    </>
  );
};

export default AppointmentCard;
