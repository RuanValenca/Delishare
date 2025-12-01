import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import MainLayout from "../layouts/MainLayout";
import DelishareMenu from "../pages/DelishareMenu";
import About from "../pages/About";
import Settings from "../pages/Settings";
import Recipes from "../pages/Recipes";
import Feed from "../pages/Feed";
import { ProtectedRoute } from "./protectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/Delishare" element={<DelishareMenu />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/Delishare" replace />} />
    </Routes>
  );
}
