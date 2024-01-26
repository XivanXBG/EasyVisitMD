import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import "./register.css";
const defaultValues = {
  Email: "email",
  Password: "password",
  Name:'name',
  Family: 'family'
};

export default function Register() {
  const {register} = useContext(AuthContext);
  const registerHandler = async() => {
    try {
      await register(values);
      
    } catch (error) {
      toast.error(error.message);
      
    }
  };
  const { onChange, onSubmit, values } = useForm(registerHandler, {
    [defaultValues.Email]: "",
    [defaultValues.Password]: "",
    [defaultValues.Name]: "",
    [defaultValues.Family]: "",
  });

  
  return (
    <div className="login-container">
      <form onSubmit={onSubmit}>
        <h2>Регистрация</h2>
        <label htmlFor={defaultValues.Email}>Собствено име:</label>
        <input
          type="text"
          name={defaultValues.Name}
          value={values[defaultValues.Name]}
          onChange={onChange}
          required
        />
        <label htmlFor={defaultValues.Family}>Фамилия:</label>
        <input
          type="text"
          name={defaultValues.Family}
          value={values[defaultValues.Family]}
          onChange={onChange}
          required
        />
        <label htmlFor={defaultValues.Email}>Имейл:</label>
        <input
          type="text"
          name={defaultValues.Email}
          value={values[defaultValues.Email]}
          onChange={onChange}
          required
        />

        <label htmlFor={defaultValues.Password}>Парола:</label>
        <input
          type="password"
          name={defaultValues.Password}
          value={values[defaultValues.Password]}
          onChange={onChange}
          required
        />

        <button type="submit">Вход</button>
      </form>
      
      <Link
        className="register"
        style={{ textDecoration: "none", color: "black" }}
        to="/login"
      >
        Имате Регистрация?
      </Link>
    </div>
  );
}
