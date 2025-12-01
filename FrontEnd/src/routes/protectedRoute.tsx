import { Navigate } from "react-router-dom";
import { useDelishare } from "../hooks/useProvider";
import Loading from "../components/Loading";
import type { JSX } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useDelishare();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
