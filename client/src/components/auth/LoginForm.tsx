import { Link } from "react-router";
import { useLoginForm } from "../../hooks/useLoginForm";

export const LoginForm = () => {
  const { formData, handleChange, handleSubmit } = useLoginForm();

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#020817]">
          Login to FreelanceCRM
        </h1>
        <p className="text-sm text-[#64749A] mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#5048E5]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#5048E5]"
        />
        <button
          type="submit"
          className="bg-[#5048E5] text-white py-3 rounded-md hover:bg-indigo-700 font-semibold cursor-pointer"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link to="/" className="text-[#5048E5] hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};
