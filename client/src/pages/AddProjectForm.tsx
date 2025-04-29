import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    budget: "",
    deadline: "",
    status: "pending",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Project form submitted", formData);
    
    navigate("/projects");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <Link to="/projects" className="text-blue-600 underline">
          Projects
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Project Title"
            required
          />

          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Budget"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          >
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#5048E5] hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};
