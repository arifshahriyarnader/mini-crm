import { useEffect, useState } from "react";
import { deleteProject, getAllProjects } from "../api/services";

interface Project {
  _id: string;
  clientId: string;
  clientName: string;
  title: string;
  budget: number;
  deadline: string;
  status: "pending" | "in-progress" | "completed";
}
export const useProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();

      setProjects(data);
    } catch (error) {
      setError("Failed to load projects");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  return { projects, setProjects, loading, error, handleDelete };
};
