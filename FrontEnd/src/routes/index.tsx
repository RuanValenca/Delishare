import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/login/LoginPage";
import MainLayout from "../layouts/MainLayout";
import DelishareMenu from "../features/DelishareMenu";
import About from "../features/About";
import Settings from "../features/Settings";
import Recipes from "../features/Recipes";
import Feed from "../features/Feed";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Navigate to="/Delishare" replace />} />
        <Route path={"/home"} element={<Navigate to="/Delishare" replace />} />
        <Route path={"/login"} element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route path="/Delishare" element={<DelishareMenu />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}
