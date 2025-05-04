import React from "react";
import { useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";


interface Project {
  _id: string;
  clientId: string;
  clientName: string;
  title: string;
  budget: number;
  deadline: string;
  status: "pending" | "in-progress" | "completed";
}

interface ProjectTableProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  handleDelete: (_id: string) => Promise<void>;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  handleDelete
  
}) => {
  const navigate = useNavigate();

  

  const handleInteraction = (clientId: string, projectId: string) => {
    navigate(`/add-interaction/${clientId}/${projectId}`);
  };

  const handleReminder = (clientId: string, projectId: string) => {
    navigate(`/add-reminder/${clientId}/${projectId}`);
  };

  const handleEdit = async (clientId: string, projectId: string) => {
    navigate(`/update-project/${clientId}/${projectId}`);
  };

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
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
                  <button
                    className="bg-[#5048E5] text-white px-2 py-1 rounded cursor-pointer"
                    onClick={() =>
                      handleInteraction(project.clientId, project._id)
                    }
                  >
                    Add Interaction
                  </button>
                  <button
                    className="bg-[#5048E5] text-white px-2 py-1 rounded cursor-pointer"
                    onClick={() =>
                      handleReminder(project.clientId, project._id)
                    }
                  >
                    Add Reminder
                  </button>
                  <button
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(project.clientId, project._id)}
                  >
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

      {/* card layout for small devices */}
      <div className="block md:hidden space-y-4">
        {projects.map((project, index) => (
          <div
            key={project._id}
            className="bg-white p-4 shadow-md rounded-md border border-gray-200"
          >
            <p>
              <strong>Serial No:</strong> {index + 1}
            </p>
            <p>
              <strong>Client Name:</strong> {project.clientName}
            </p>
            <p>
              <strong>Title:</strong> {project.title}
            </p>
            <p>
              <strong>Budget:</strong> ${project.budget}
            </p>
            <p>
              <strong>Deadline:</strong> {project.deadline}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{project.status}</span>
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                className="bg-[#5048E5] text-white px-2 py-1 rounded text-sm"
                onClick={() => handleInteraction(project.clientId, project._id)}
              >
                Add Interaction
              </button>
              <button
                className="bg-[#5048E5] text-white px-2 py-1 rounded text-sm"
                onClick={() => handleReminder(project.clientId, project._id)}
              >
                Add Reminder
              </button>
              <button
                className="text-blue-500"
                onClick={() => handleEdit(project.clientId, project._id)}
              >
                <FaEdit size={18} />
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(project._id)}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
