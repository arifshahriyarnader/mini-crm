import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { deleteProject } from "../../api/services";

interface Project {
  _id: string;
  clientName: string;
  title: string;
  budget: number;
  deadline: string;
  status: "pending" | "in-progress" | "completed";
}

interface ProjectTableProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  setProjects,
}) => {
  const handleDelete = async (_id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProject(_id);
      setProjects((prev) => prev.filter((project) => project._id !== _id));
      alert("Project deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete project");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border-b">Serial No</th>
            <th className="p-2 border-b">Client Name</th>
            <th className="p-2 border-b">Title</th>
            <th className="p-2 border-b">Budget</th>
            <th className="p-2 border-b">Deadline</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project._id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{project.clientName}</td>
              <td className="p-2">{project.title}</td>
              <td className="p-2">${project.budget}</td>
              <td className="p-2">{project.deadline}</td>
              <td className="p-2 capitalize">{project.status}</td>
              <td className="p-2 flex gap-2">
                <button className="text-blue-500 cursor-pointer">
                  <FaEdit size={20} />
                </button>

                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(project._id)}
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
