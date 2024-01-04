import { connect } from "react-redux";
import { updateSearchCriteria } from "../../reducer/action";
import "./specailty.css";
import { useNavigate } from "react-router-dom";

const Specialty = ({ customDispatch }) => {
  const navigate = useNavigate();
  const handleSearch = (specialty) => {
    console.log(specialty);
    customDispatch(updateSearchCriteria({ specialty: specialty }));
    navigate("/doctors");
  };

  return (
    <>

        <div onClick={() => handleSearch("Акушер-гинеколог")} className="card">
        <i className="fa-solid fa-venus"></i>
          <span>Акушер-гинеколог</span>
        </div>
        <div onClick={() => handleSearch("Педиатър")} className="card">
          <i className="fa-solid fa-child"></i>
          <span>Педиатър</span>
        </div>
        <div onClick={() => handleSearch("УНГ")} className="card">
          <i className="fa-solid fa-ear-listen"></i>
          <span>УНГ</span>
        </div>
        <div onClick={() => handleSearch("Невролог")} className="card">
          <i className="fa-solid fa-brain"></i>
          <span>Невролог</span>
        </div>
        <div onClick={() => handleSearch("Офталмолог")} className="card">
          <i className="fa-solid fa-eye"></i>
          <span>Офталмолог</span>
        </div>
        <div onClick={() => handleSearch("Ортопед")} className="card">
          <i className="fa-solid fa-bone"></i>
          <span>Ортопед</span>
        </div>
        <div onClick={() => handleSearch("Кардиолог")} className="card">
          <i className="fa-solid fa-heart-pulse"></i>
          <span>Кардиолог</span>
        </div>
        <div onClick={() => handleSearch("Стоматолог")} className="card">
          <i className="fa-solid fa-tooth"></i>
          <span>Стоматолог</span>
        </div>
    
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  customDispatch: dispatch,
});

export default connect(null, mapDispatchToProps)(Specialty);
