const createDoctor = async(doctorData)=>{
    const res = await fetch("http://localhost:5000/add-doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ data: doctorData }), // Send data as JSON
    });

    return;
}


const searchDoctor = async (searchCriteria) => {
  
  const res = await fetch('http://localhost:5000/doctors');
  const doctors = await res.json();


const filteredDoctors = doctors.filter((doctor) => {
  return (
    (!searchCriteria.specialty || doctor.specialty === searchCriteria.specialty) &&
    (!searchCriteria.location || doctor.location === searchCriteria.location) &&
    (!searchCriteria.name || doctor.firstName.toLowerCase().includes(searchCriteria.name.toLowerCase()) || doctor.family.toLowerCase().includes(searchCriteria.name.toLowerCase()))
  );
});

  return filteredDoctors;
};


const loadReservations = async (userId)=>{
 
  
  const res = await fetch("http://localhost:5000/loadReservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    body: JSON.stringify({ userId: userId }), // Send data as JSON
  });
  const reservations = await res.json();
  
  return reservations;
}

export {createDoctor,searchDoctor,loadReservations};