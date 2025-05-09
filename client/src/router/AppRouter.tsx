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
  AddProjectForm,
  AddInteractionFormPage,
  AddReminderForm,
  UpdateClientFormPage,
  UpdateProjectFormPage,
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
        <Route
          path="/client-profile/:id"
          element={
            <SecureRoute>
              <ClientProfilePage />
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
          path="/add-project/:clientId"
          element={
            <SecureRoute>
              <AddProjectForm />
            </SecureRoute>
          }
        />
         <Route
          path="/update-project/:clientId/:projectId"
          element={
            <SecureRoute>
              <UpdateProjectFormPage />
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
        <Route
          path="/add-interaction/:clientId/:projectId"
          element={
            <SecureRoute>
              <AddInteractionFormPage />
            </SecureRoute>
          }
        />
        <Route
          path="/reminders"
          element={
            <SecureRoute>
              <ReminderPage />
            </SecureRoute>
          }
        />
        <Route
          path="/add-reminder/:clientId/:projectId"
          element={
            <SecureRoute>
              <AddReminderForm />
            </SecureRoute>
          }
        />
        <Route
          path="/update-client/:id"
          element={
            <SecureRoute>
              <UpdateClientFormPage />
            </SecureRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
