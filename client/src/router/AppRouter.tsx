import { BrowserRouter, Route, Routes } from "react-router";
import { SignupPage } from "../pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
