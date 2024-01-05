import styles from "./home.module.css";
import Form from "../Form/form";
import Specialty from "./specialty";


const Home = ({}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <div className={styles.form}>
          <Form />
        </div>
        <div className={styles.image}>
          <img src="/images/doctor.jpg" alt="Doctor" />
        </div>
      </div>
      <div className={styles.locationSearch}>
        <h4>Популярни специалности</h4>
        <div className={styles.specialties}>
          <Specialty />
        </div>
      </div>
    </div>
  );
};
export default Home;
