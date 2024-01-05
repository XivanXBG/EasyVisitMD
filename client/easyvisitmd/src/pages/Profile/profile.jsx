import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import "./profile.css";
export default function Profile() {
  const { loadUserInfo } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [activeTab, setActiveTab] = useState("profileInfo");
  const submitHandler = ()=>{
    console.log(values);
  }
  const {onSubmit,onChange,values} = useForm(submitHandler,{name: userInfo?.name,family: userInfo?.family});

  

  useEffect(() => {
    loadUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);

  useEffect(() => {
    if (userInfo) {
      values.name = userInfo.name;
      values.family = userInfo.family;
        
    }
  }, [userInfo]);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const renderProfileInfo = () => (
    <div>
      <div className="profile-info">
        <i
          onClick={() => switchTab("editProfile")}
          className="fa-solid fa-pen-to-square"
        ></i>
        <h2>Профил</h2>
        <div>
          <strong>Име:</strong> {userInfo?.name}
        </div>
        <div>
          <strong>Фамилия:</strong> {userInfo?.family}
        </div>
        <div>
          <strong>Имейл:</strong> {userInfo?.email}
        </div>
        <div>
          <strong>Роля:</strong> {userInfo?.role}
        </div>
      </div>
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
  const renderEditProfile = () => (
    userInfo && (
      <div className="profile-info">
      <i
        onClick={() => switchTab("editProfile")}
        className="fa-solid fa-pen-to-square"
      ></i>
      <h2>Редактирай:</h2>
      <form onSubmit={onSubmit} action="">
        <label>Име:</label>
        <input onChange={onChange} value={values['name']} type="text" />
        <label>Фамилия:</label>
        <input onChange={onChange} value={values['family']} placeholder={values.family} type="text" />
        <button>Запиши</button>
        
      </form>
    </div>
    )
    
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profileInfo":
        return renderProfileInfo();
      case "myReservations":
        return renderMyReservations();
      case "pastReservations":
        return renderPastReservations();
      case "editProfile":
        return renderEditProfile();
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <button
          className={activeTab === "profileInfo" ? "active" : ""}
          onClick={() => switchTab("profileInfo")}
        >
          Profile Info
        </button>
        <button
          className={activeTab === "myReservations" ? "active" : ""}
          onClick={() => switchTab("myReservations")}
        >
          My Reservations
        </button>
        <button
          className={activeTab === "pastReservations" ? "active" : ""}
          onClick={() => switchTab("pastReservations")}
        >
          Past Reservations
        </button>
      </aside>
      <div className="profile-content">{renderContent()}</div>
    </div>
  );
}
