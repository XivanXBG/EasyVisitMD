import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import styles from "./header.module.css";
export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
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
          {isAuthenticated && (
            <Link to="/profile">
              <img
                style={{ height: "40px" }}
                className={styles.headerLogo}
                src="/images/profile.png"
                alt="Profile"
              />
            </Link>
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
}
