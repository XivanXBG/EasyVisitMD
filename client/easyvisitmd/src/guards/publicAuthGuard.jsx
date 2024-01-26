import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export default function AuthGuardPublic(props) {
  const { isAuthenticated } = useContext(AuthContext);
  const [isAuth, setIsAuthd] = useState();
  useEffect(() => {
    isAuthenticated().then(x=>{setIsAuthd(x);console.log(x);})
  }, []);
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
