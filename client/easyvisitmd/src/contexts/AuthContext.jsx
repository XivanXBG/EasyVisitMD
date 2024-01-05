import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";




const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  function saveAuthTokenToLocalStorage(token) {
    localStorage.setItem("authToken", token);
  }
  function removeAuthTokenFromLocalStorage() {
    localStorage.removeItem("authToken");
  }
  function isAuthenticated() {
    const authToken = localStorage.getItem("authToken");
    return authToken !== null;
  }

  const navigate = useNavigate();
  
  const logout = () =>{
    removeAuthTokenFromLocalStorage();

    navigate("/login");
  }
  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const responseData = await response.json();
      const token = responseData.token;
      saveAuthTokenToLocalStorage(token);
      navigate("/");
     
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const register = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const responseData = await response.json();
      const token = responseData.token;
      saveAuthTokenToLocalStorage(token);
      navigate("/");
      
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const contextValues = {
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
