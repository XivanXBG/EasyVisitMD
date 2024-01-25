const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: {type:String}
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
