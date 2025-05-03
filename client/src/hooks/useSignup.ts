import { useState } from "react";
import { useNavigate } from "react-router";
import { authServices } from "../auth";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [honeypot, setHoneypot] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "honeypot") {
      setHoneypot(e.target.value);
      return;
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  //validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  //validdate password length
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    if (honeypot) {
      console.log("Honeypot triggered!");
      return;
    }

    if (!formData.email) {
      alert("Email is required");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Invalid email format");
      return;
    }

    if (!isValidPassword(formData.password)) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      await authServices.signup(payload);
      alert("Signup successful! Now you can login.");
      setTimeout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return { formData, honeypot, handleChange, handleSubmit };
};
