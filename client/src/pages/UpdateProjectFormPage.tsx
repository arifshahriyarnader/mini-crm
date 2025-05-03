import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getProjectById, updateProject } from "../api/services";

export const UpdateProjectFormPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    budget: "",
    deadline: "",
    status: "pending",
    clientId: "",
  });
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        try {
          const project = await getProjectById(projectId);
          setFormData({
            title: project.title,
            budget: project.budget.toString(),
            deadline: project.deadline.slice(0, 10),
            status: project.status,
            clientId: project.clientId,
          });
        } catch (err) {
          console.error("Failed to fetch project:", err);
        }
      }
    };

    fetchProject();
  }, [projectId]);

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
    try {
      await updateProject({
        _id: projectId!,
        ...formData,
      });

      alert("Project updated successfully");
      navigate("/projects");
      const updatedProject = await getProjectById(projectId!);
      setFormData({
        title: updatedProject.title,
        budget: updatedProject.budget.toString(),
        deadline: updatedProject.deadline.slice(0, 10),
        status: updatedProject.status,
        clientId: updatedProject.clientId,
      });
    } catch (err) {
      console.error("Failed to update project:", err);
    }
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
          Update Project
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
            <option value="pending">pending</option>
            <option value="inprogress">in-progress</option>
            <option value="completed">completed</option>
          </select>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#5048E5] hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};
