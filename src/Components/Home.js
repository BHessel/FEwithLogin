import React from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

const Home = () => {
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
