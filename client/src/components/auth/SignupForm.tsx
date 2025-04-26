import { useState } from "react";
import { Link } from "react-router";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      <form className="space-y-4">
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

export default SignupForm;
