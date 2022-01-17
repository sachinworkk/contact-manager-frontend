import { Navigate, Outlet } from "react-router";

import { getLoggedInUser } from "../services/auth";

import { isEmpty as isObjectEmpty } from "../utils/object";

const useAuth = () => {
  if (!isObjectEmpty(getLoggedInUser())) {
    return true;
  }
  return false;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
