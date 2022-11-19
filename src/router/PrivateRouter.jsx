import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLoginContext } from "../contexts/AuthContext";

const PrivateRouter = () => {
  const { currentUser } = useLoginContext();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
