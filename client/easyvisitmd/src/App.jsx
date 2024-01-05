import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header/header";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import store from "../src/reducer/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from './pages/Profile/profile'

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
          </Routes>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
