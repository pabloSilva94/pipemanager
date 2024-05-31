import { Navigate } from "react-router-dom";

export function PrivateRoute({children }) {

  const isAuth = () => {
    const token = localStorage.getItem("user");
    if(token === null){
      return false
    }
    return true
  };

  return isAuth() ? children : <Navigate to="/login"/>
}