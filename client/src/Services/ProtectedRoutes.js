import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("token");
  return auth && auth !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
