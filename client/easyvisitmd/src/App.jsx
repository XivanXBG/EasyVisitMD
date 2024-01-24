import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header/header";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import store from "../src/reducer/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from './pages/Profile/profile'
import UsersTable from "./pages/Users/users";
import Doctor from "./pages/Doctor/doctor";

function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/users" element={<UsersTable />}></Route>
            <Route path="/add-doctor" element={<Doctor />}></Route>
          </Routes>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
