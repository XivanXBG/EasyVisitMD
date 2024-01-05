import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import './profile.css'
export default function Profile() {
  const { loadUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [activeTab, setActiveTab] = useState('profileInfo');

  useEffect(() => {
    loadUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);


  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  

  const renderProfileInfo = () => (
    <div className="profile-info">
      <h2>Profile Information</h2>
      <div>
        <strong>Name:</strong> {userInfo?.name}
      </div>
      <div>
        <strong>Email:</strong> {userInfo?.email}
      </div>
      <div>
        <strong>Role:</strong> {userInfo?.role}
      </div>
      {/* Add more user details as needed */}
    </div>
  );

  const renderMyReservations = () => (
    <div className="my-reservations">
      <h2>My Reservations</h2>
      {/* Add your reservations logic here */}
    </div>
  );

  const renderPastReservations = () => (
    <div className="past-reservations">
      <h2>Past Reservations</h2>
      {/* Add your past reservations logic here */}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profileInfo':
        return renderProfileInfo();
      case 'myReservations':
        return renderMyReservations();
      case 'pastReservations':
        return renderPastReservations();
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <button className={activeTab === 'profileInfo' ? 'active' : ''} onClick={() => switchTab('profileInfo')}>
          Profile Info
        </button>
        <button className={activeTab === 'myReservations' ? 'active' : ''} onClick={() => switchTab('myReservations')}>
          My Reservations
        </button>
        <button className={activeTab === 'pastReservations' ? 'active' : ''} onClick={() => switchTab('pastReservations')}>
          Past Reservations
        </button>
      </aside>
      <div className="profile-content">{renderContent()}</div>
    </div>
  );
};


