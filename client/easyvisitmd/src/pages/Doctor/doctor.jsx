import styles from "./doctor.module.css";
import useForm from "../../hooks/useForm";

const defaultValues = {
    firstName: "",
    family: "",
    specialty: "",
    location: "",
  };

export default function Doctor() {
  const submitValues = () => {
    console.log("submit");
    console.log(values);
  };
  const { onChange, onSubmit, values } = useForm(submitValues, defaultValues);

  return (
    <div className={styles.wrapperForm}>
      <h2>Добавете доктор</h2>
      <form className={styles.form} onSubmit={onSubmit} action="">
        <label className={styles.label} htmlFor="firstName">Име</label>
        <input
          type="text"
          onChange={onChange}
          name="firstName"
          value={values["firstName"]}
          required
        />
        <label className={styles.label} htmlFor="family">Фамилия</label>
        <input
          type="text"
          name="family"
          onChange={onChange}
          value={values["family"]}
          required
        />
        <label className={styles.label} htmlFor="specialty">Специалност</label>
        <select
          name='specialty'
          value={values['specialty']}
          onChange={onChange}
          required
        >
          <option value="">Избери специалност</option>
          <option value="Кардиолог">Кардиолог</option>
          <option value="Дерматолог">Дерматолог</option>
          <option value="Ортопед">Ортопед</option>
          <option value="Педиатрър">Педиатрър</option>
          <option value="Акушер-гинеколог">Акушер-гинеколог</option>
          <option value="Невролог">Невролог</option>
          <option value="Психиатър">Психиатър</option>
          <option value="Офталмолог">Офталмолог</option>
          <option value="УНГ">Уши, нос и гърло</option>
          <option value="Гастроентеролог">Гастроентеролог</option>
          <option value="Уролог">Уролог</option>
          <option value="Стоматолог">Стоматолог</option>
          <option value="Ревматолог">Ревматолог</option>
          <option value="Онколог">Онколог</option>
          <option value="Ендокринолог">Ендокринолог</option>
          <option value="Нефролог">Нефролог</option>
        </select>
        <label className={styles.label} htmlFor="specialty">Локация</label>
        <select
          name='location'
          value={values['location']}
          onChange={onChange}
          required
        >
          <option value="">Избери лечебно заведение</option>
          <option value="SvetiGeorgi">УМБАЛ "Свети Георги"</option>
          <option value="Alexandrovсka">УМБАЛ "Александровска"</option>
          <option value="Pirogov">Пироговска болница</option>
          <option value="SvetaSofia">МБАЛ "Света София"</option>
          <option value="Lozenets">Болница "Лозенец"</option>
          <option value="DrMarinov">Поликлиника "Д-р М. Маринов"</option>
          <option value="SvetiNaum">Поликлиника "Свети Наум"</option>
          <option value="TsaritsaYoanna">МБАЛ "Царица Йоанна"</option>
          <option value="Nadezhda">МБАЛ "Надежда"</option>
          <option value="Pulmed">Поликлиника "Пулмед"</option>
        </select>
        <button className={styles.button}>Добави</button>
      </form>
    </div>
  );
}
