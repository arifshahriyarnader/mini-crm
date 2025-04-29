import { BrowserRouter, Route, Routes } from "react-router";
import {
  ClientsPage,
  DashboardPage,
  InteractionsPage,
  ReminderPage,
  LoginFormPage,
  ProjectsPage,
  SignupPage,
  AddClientFormPage,
  ClientProfilePage,
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
          path="/add-client"
          element={
            <SecureRoute>
              <AddClientFormPage />
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
        <Route path="/client-profile" element={<SecureRoute><ClientProfilePage /></SecureRoute>} />
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
        <Route path="/reminders" element={<SecureRoute><ReminderPage /></SecureRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
