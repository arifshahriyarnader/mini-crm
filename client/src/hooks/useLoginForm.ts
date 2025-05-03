import { useState } from "react";
import { useNavigate } from "react-router";

import { authServices } from "../auth";
import { LoginData } from "../auth/authTypes";

interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login data:", formData);
    const payload: LoginData = {
      type: "email",
      email: formData.email,
      password: formData.password,
    };
    try {
      const authUser = await authServices.login(payload);
      console.log("Login successful:", authUser);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };
  return { formData, setFormData, handleChange, handleSubmit };
};
