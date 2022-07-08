import React, { useState } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  console.log("currentUser from home", currentUser);

  return (
    <>
      <div className="bg-flex-wrapper-2">
        <Registration />
        <Login />
      </div>
    </>
  );
};

export default Home;
