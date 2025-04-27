import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardPage, LoginFormPage, SignupPage } from "../pages";

import SecureRoute from "./SecureRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginFormPage />} />
        <Route
          path="/dashboard"
          element={
            <SecureRoute>
              <DashboardPage />
            </SecureRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
