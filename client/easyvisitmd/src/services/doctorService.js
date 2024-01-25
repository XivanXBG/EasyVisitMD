const createDoctor = async(doctorData)=>{
    const res = await fetch("http://localhost:5000/add-doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ data: doctorData }), // Send data as JSON
    });
    console.log(res);
    return;
}


const searchDoctor = async (searchCriteria) => {
  
  const res = await fetch('http://localhost:5000/doctors');
  const doctors = await res.json();
console.log(searchCriteria);

const filteredDoctors = doctors.filter((doctor) => {
  return (
    (!searchCriteria.specialty || doctor.specialty === searchCriteria.specialty) &&
    (!searchCriteria.location || doctor.location === searchCriteria.location) &&
    (!searchCriteria.name || doctor.firstName.toLowerCase().includes(searchCriteria.name.toLowerCase()) || doctor.family.toLowerCase().includes(searchCriteria.name.toLowerCase()))
  );
});
console.log(filteredDoctors);
  return filteredDoctors;
};

export {createDoctor,searchDoctor};