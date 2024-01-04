import useForm from "../../hooks/useForm";
import styles from "./form.module.css";

const defaultValues = {
  Specialty: "specialty",
  Location: "location",
  NameDoc: "namedoc",
};

export default function Form() {
  const submitHandler = () => {
    console.log(values);
  };

  
  const { onChange, onSubmit, values } = useForm(submitHandler, {
    [defaultValues.Location]: "",
    [defaultValues.NameDoc]: "",
    [defaultValues.Specialty]: "",
  });

  return (
    <div className={styles.container}>
      <h3>Намерете лекар и резервирайте час за преглед онлайн</h3>
      <h5>Търси лекар</h5>
      <form className={styles.searchForm} onSubmit={onSubmit} action="">
        <select
          name={defaultValues.Specialty}
          value={values[defaultValues.Specialty]}
          onChange={onChange}
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
        <select
          name={defaultValues.Location}
          value={values[defaultValues.Location]}
          onChange={onChange}
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
        <input
          name={defaultValues.NameDoc}
          value={values[defaultValues.NameDoc]}
          onChange={onChange}
          type="text"
          placeholder="Търси име по лекар...  (кирилица)"
        />

        <button className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
