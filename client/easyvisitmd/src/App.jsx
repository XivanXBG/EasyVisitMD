import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header/header";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import store from "../src/reducer/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      </Provider>
     
    </>
  );
}

export default App;
