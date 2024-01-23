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
  

  const navigate = useNavigate();

  const loadUserInfo = async () => {
    const authToken = localStorage.getItem("authToken");
  
    if (authToken === null) {
      return;
    }
  
    const res = await fetch("http://localhost:5000/userInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ token: authToken }), // Send data as JSON
    });
  
   
    if (!res.ok) {
      navigate("/login");
      return null;
    }
  
    const responseData = await res.json();
    const user = responseData.user;
    return user;
  };
  
  const updateUser = async (userData) =>{
   
    const res = await fetch("http://localhost:5000/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ userId: userData._id,userInfo:userData }), // Send data as JSON
    });
    console.log(res);
    return;
  }
  const deleteUser = async (userData) =>{
   
    const res = await fetch("http://localhost:5000/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({userId:userData}), // Send data as JSON
    });
    console.log(res);
    return;
  }

  
  const logout = () => {
    removeAuthTokenFromLocalStorage();

    navigate("/");
  };
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
   
    login,
    register,
    logout,
    loadUserInfo,
    updateUser,
    deleteUser
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
