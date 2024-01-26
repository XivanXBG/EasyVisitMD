import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header/header";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import store from "../src/reducer/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./pages/Profile/profile";
import UsersTable from "./pages/Users/users";
import Doctor from "./pages/Doctor/doctor";
import DoctorList from "./pages/DoctorsPage/doctors";
import AuthGuard from "./guards/authGuard";
import AuthGuardPublic from "./guards/publicAuthGuard";
import NotFoundPage from "./pages/NotFound/notFound";

function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route element={<AuthGuard />}>
              <Route path="/users" element={<UsersTable />}></Route>
              <Route path="/add-doctor" element={<Doctor />}></Route>
            </Route>

              <Route path="/profile" element={<Profile />}></Route>
            <Route element={<AuthGuardPublic />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Route>
            <Route path="/" element={<Home />}></Route>

            <Route path="/doctors" element={<DoctorList />}></Route>
            <Route path="/404" element={<NotFoundPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
