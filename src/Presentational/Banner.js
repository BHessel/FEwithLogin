import React, { useState } from "react";
import logo from "../Images/netflixMMlogoSMALL.png";
// import { API_ROOT } from '../services/apiRoot';
import { useAuth } from "../context/AuthContext";

const Banner = () => {
  const [error, setError] = useState("");
  const { currentUser, logoutUser } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await logoutUser();
    } catch {
      setError("Error logging out");
    }
  };

  return (
    <div className="banner-box">
      <div className="logoContainer">
        <img src={logo} alt="logo" className="logoIMG" />
      </div>

      <div className="logout">
        {currentUser ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Banner;
