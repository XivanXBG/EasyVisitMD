

import React, { useEffect, useState,useContext } from 'react';
import { connect } from 'react-redux';
import { searchDoctor } from '../../services/doctorService';
import { updateSearchCriteria } from '../../reducer/action';
import ReservationModal from './reservationModal';
import Form from '../Form/form';
import styles from './doctors.module.css';
import AuthContext from '../../contexts/AuthContext';


const DoctorList = ({ searchCriteria }) => {
  const {isAuthenticated} = useContext(AuthContext)
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isAuth,setIsAuth] = useState();

  useEffect(() => {
    const fetchDoctors = async () => {
      const fetchedDoctors = await searchDoctor(searchCriteria);
      setDoctors(fetchedDoctors);
    };

    fetchDoctors();
  }, [searchCriteria]);

  useEffect(()=>{
    isAuthenticated().then(x=>setIsAuth(x))
  },[])
  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling when the modal is open
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
   
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Enable scrolling when the modal is closed
    document.body.style.backgroundColor = ''; // Revert the background to its original color
  };
  return (
    <div className={`${styles.container} ${isModalOpen ? styles.modalOpen : ''}`}>
      
      {!isModalOpen && (
        <div className={styles.searchForm}>
        <Form />
      </div>
      )}
      
      <div className={styles.results}>
        <h2>Doctor List</h2>
        {doctors.map((doctor) => (
          <div key={doctor._id} className={styles.doctorCard}>
            <h3>{`${doctor.firstName} ${doctor.family}`}</h3>
            <p>Специалност: {doctor.specialty}</p>
            <p>Локация: {getLocationName(doctor.location)}</p>
            {isAuth&&(
              <button onClick={() => openModal(doctor)}>Запази час</button>
            )}
            
          </div>
        ))}
      </div>
      {selectedDoctor && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          doctorInfo={selectedDoctor}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchCriteria: state,
});

const mapDispatchToProps = {
  updateSearchCriteria,
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList);
const getLocationName = (locationValue) => {
    switch (locationValue) {
      case 'SvetiGeorgi':
        return 'УМБАЛ "Свети Георги"';
      case 'Alexandrovсka':
        return 'УМБАЛ "Александровска"';
      case 'Pirogov':
        return 'Пироговска болница';
      case 'SvetaSofia':
        return 'МБАЛ "Света София"';
      case 'Lozenets':
        return 'Болница "Лозенец"';
      case 'DrMarinov':
        return 'Поликлиника "Д-р М. Маринов"';
      case 'SvetiNaum':
        return 'Поликлиника "Свети Наум"';
      case 'TsaritsaYoanna':
        return 'МБАЛ "Царица Йоанна"';
      case 'Nadezhda':
        return 'МБАЛ "Надежда"';
      case 'Pulmed':
        return 'Поликлиника "Пулмед"';
      default:
        return ''; // Handle the default case or return an empty string
    }
  };