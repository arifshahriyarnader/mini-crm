import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

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
}

export const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
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

                <button className="text-red-500 cursor-pointer">
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
