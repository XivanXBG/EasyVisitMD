const Doctor = require('../models/Doctor');


exports.createDoctor = async (doctorData)=>{
    try {
        const doctor = Doctor.create(doctorData);
        return doctor
    } catch (error) {
        throw error
    }
}
exports.findAll = async ()=>{
    try {
        const doctors = Doctor.find();
        return doctors;
    } catch (error) {
        
    }
   
}