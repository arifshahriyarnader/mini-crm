import { Layout } from "../../components/index";
import { ProjectTable } from "./ProjectsTable";
import { useProject } from "../../hooks/useProject";

export const Projects = () => {
  const { projects, setProjects, loading, error, handleDelete } = useProject();

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout title="Projects">
      {projects.length > 0 ? (
        <ProjectTable projects={projects} setProjects={setProjects} handleDelete={handleDelete} />
      ) : (
        <div className="text-center py-8">
          <p>No projects found</p>
        </div>
      )}
    </Layout>
  );
};
