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

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Projects">
      <div>
        <ProjectTable projects={projects} />
      </div>
    </Layout>
  );
};
