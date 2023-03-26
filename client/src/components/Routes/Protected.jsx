import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.user);

  return user ? children : <Navigate to="/login" />;
};

export default Protected;
