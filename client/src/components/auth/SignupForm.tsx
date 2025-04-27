import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { authServices } from "../../auth";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export const SignupForm = () => {
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
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null;
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

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold" style={{ color: "#020817" }}>
          Create your FreelanceCRM Account
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#64748B" }}>
          Sign up to start managing your freelance business
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Honeypot Field hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={honeypot}
          onChange={handleChange}
          className="hidden"
          autoComplete="off"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-md p-2 font-semibold text-white"
          style={{ backgroundColor: "#5048E5" }}
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-[#5048E5] hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};


