import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import styles from "./header.module.css";

const Header = () => {
  const { logout, loadUserInfo } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadUserInfo().then((x) => {
      setUserInfo(x);
      if (x == null) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    });
  }, [loadUserInfo]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div>
      <nav>
        <div className={styles.navigation}>
          <Link to="/">
            <img
              className={styles.headerLogo}
              src="/images/logo.png"
              alt="Logo"
            />
          </Link>
          <div style={{display:'flex',gap:'20px'}}>
          {userInfo?.role == "ceo" && <Link className={styles.link} to='/users'>Users</Link>}
          {userInfo?.role == "ceo" && <Link className={styles.link} to='/add-doctor'>Doctor</Link>}
          </div>
          

          {isAuthenticated && (
            <div className={styles.dropdownContainer}>
              <button
                className={styles.dropdownToggle}
                onClick={toggleDropdown}
              >
                Hello, {userInfo && userInfo.name} ▼
              </button>
              {showDropdown && (
                <div className={styles.dropdownContent}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/my-reservations">My Reservations</Link>
                  <Link to="/past-reservations">Past Reservations</Link>
                  <button className={styles.logout} onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {!isAuthenticated && (
            <Link to="/login">
              <img
                style={{ height: "40px" }}
                className={styles.headerLogo}
                src="/images/profile.png"
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
      <hr style={{ margin: "0px", padding: "0px" }} />
    </div>
  );
};

export default Header;
