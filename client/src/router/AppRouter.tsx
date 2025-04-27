import { BrowserRouter, Route, Routes } from "react-router";
import { SignupPage } from "../pages";
import LoginFormPage from "../pages/LoginFormPage";
import DashboardPage from "../pages/DashboardPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginFormPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
