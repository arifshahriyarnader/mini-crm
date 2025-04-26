import { BrowserRouter, Route, Routes } from "react-router";
import { SignupPage } from "../pages";
import LoginFormPage from "../pages/LoginFormPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginFormPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
