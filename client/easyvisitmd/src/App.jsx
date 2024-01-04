import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header/header";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
