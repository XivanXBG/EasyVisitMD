import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import "./login.css";
const defaultValues = {
  Email: "email",
  Password: "password",
};

export default function Login() {
  const {login} = useContext(AuthContext);
  const loginHandler = async () => {
    try {
      await login(values);
      // If login is successful, continue with any other logic
    } catch (error) {
      console.log(error.message); // Log the error message
      // Handle the error here, show a message to the user, etc.
    }
  };
  const { onChange, onSubmit, values } = useForm(loginHandler, {
    [defaultValues.Email]: "",
    [defaultValues.Password]: "",
  });

  
  return (
    <div className="login-container">
      <form onSubmit={onSubmit}>
        <h2>Вход</h2>
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
      <p>Забравена парола?</p>

      <Link
        className="register"
        style={{ textDecoration: "none", color: "black" }}
        to="/register"
      >
        Нямате Регистрация?
      </Link>
    </div>
  );
}
