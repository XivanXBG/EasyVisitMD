const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [3, "First name must be at least 3 characters long!"]
    },
    family: {
        type: String,
        required: [true, "Family name is required!"],
        minLength: [3, "Family name must be at least 3 characters long!"]
    },
    specialty: {
        type: String,
        required: [true, "Specialty is required!"],
        
    },
    location: {
        type: String,
        required: [true, "Location is required!"],
        
    },
    
});



doctorSchema.pre("save", async function () {
   

    let location = this.location.trim();
    let specialty = this.specialty.trim();
    let firstName = this.firstName.trim()
    let family = this.family.trim();

    this.location = location;
    this.specialty = specialty;
    this.family = family;
    this.firstName = firstName;

    
});


const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
