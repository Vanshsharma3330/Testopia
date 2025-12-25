import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AppLoader from "../../shared/components/loaders/loaders";

export default function ProtectedRoute() {
  const { loading, loggedin } = useAuth();

  if (loading) {
    return <AppLoader />;
  }

  return loggedin ? <Outlet /> : <Navigate to="/login" />;
}
