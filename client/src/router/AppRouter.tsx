import { BrowserRouter, Route, Routes } from "react-router";
import {
  ClientsPage,
  DashboardPage,
  InteractionsPage,
  LoginFormPage,
  ProjectsPage,
  SignupPage,
} from "../pages";

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
        <Route
          path="/clients"
          element={
            <SecureRoute>
              <ClientsPage />
            </SecureRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <SecureRoute>
              <ProjectsPage />
            </SecureRoute>
          }
        />
        <Route
          path="/interactions"
          element={
            <SecureRoute>
              <InteractionsPage />
            </SecureRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
