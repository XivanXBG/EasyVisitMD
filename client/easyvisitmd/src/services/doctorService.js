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

export {createDoctor};