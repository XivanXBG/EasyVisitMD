import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadReservations } from "../../services/doctorService";
import AuthContext from "../../contexts/AuthContext";
import useForm from "../../hooks/useForm";
import AppointmentCard from "./appoitment";
import "./profile.css";
export default function Profile() {
  const { loadUserInfo, updateUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [activeTab, setActiveTab] = useState("profileInfo");
  const [reservation, setResevations] = useState();

  const navigate = useNavigate();
  const submitHandler = () => {
    let name = values.name;
    let family = values.family;
    if (name === "") {
      name = userInfo.name;
    }
    if (family === "") {
      family = userInfo.family;
    }
    const temp = {
      ...userInfo,
      name,
      family,
    };
    userInfo.name = name;
    userInfo.family = family;

    updateUser(temp);
    navigate("/profile");
    setActiveTab("profileInfo");
  };
  const { onSubmit, onChange, values } = useForm(submitHandler, {
    name: userInfo?.name || "",
    family: userInfo?.family || "",
  });

  useEffect(() => {
    loadUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);

  useEffect(() => {
    loadReservations(userInfo?._id).then((x) => setResevations(x));
  }, [userInfo]);
  useEffect(() => {
    renderContent();
    console.log(reservation);
  }, [activeTab]); // Add activeTab as a dependency

  const switchTab = (tab) => {
    setActiveTab(tab);
    renderContent();
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
    <div>
      <div className="profile-info">
        <h2>My Reservations</h2>
        <div style={{display:'grid',gridTemplateRows:'repeat(2, 1fr)'}}>
          {reservation.map((x) => (
            <AppointmentCard key={x._id} {...x} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderEditProfile = () =>
    userInfo && (
      <div className="profile-info">
        <i onClick={(e) => onSubmit(e)} className="fa-solid fa-floppy-disk"></i>
        <h2>Редактирай:</h2>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={onSubmit}
          action=""
        >
          <label htmlFor="name">Име:</label>
          <input
            style={{ padding: "5px" }}
            name="name"
            onChange={onChange}
            value={values["name"]}
            type="text"
          />
          <label htmlFor="family">Фамилия:</label>
          <input
            style={{ padding: "5px" }}
            name="family"
            onChange={onChange}
            value={values["family"]}
            placeholder={values.family}
            type="text"
          />
          <button
            className="buttonEdit"
            style={{
              backgroundColor: "green",
              width: "150px",
              padding: "8px",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Запиши
          </button>
        </form>
      </div>
    );

  const renderContent = () => {
    switch (activeTab) {
      case "profileInfo":
        return renderProfileInfo();
      case "myReservations":
        return renderMyReservations();
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
      </aside>
      <div className="profile-content">{renderContent()}</div>
    </div>
  );
}
