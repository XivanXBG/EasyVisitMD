import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <div className={styles.form}>
          <h4>form</h4>
        </div>
        <div className={styles.image}>
            <img src="/images/doctor.jpg" alt="Doctor" />
        </div>
      </div>
    </div>
  );
}
