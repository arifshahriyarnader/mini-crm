import { useEffect, useState } from "react";
import { Layout } from "../../components/index";
import { ProjectTable } from "./ProjectsTable";
import { getAllProjects } from "../../api/services";

interface Project {
  _id: string;
  clientName: string;
  title: string;
  budget: number;
  deadline: string;
  status: "pending" | "in-progress" | "completed";
}

export const Projects = () => {
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

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout title="Projects">
      {projects.length > 0 ? (
        <ProjectTable projects={projects} setProjects={setProjects} />
      ) : (
        <div className="text-center py-8">
          <p>No projects found</p>
        </div>
      )}
    </Layout>
  );
};
