// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // You'll create this context if not already

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Checks if user is logged in

  if (!user) {
    // If no user, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // If logged in, show the protected content
};

export default ProtectedRoute;
