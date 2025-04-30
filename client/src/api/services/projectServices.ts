import { http } from "../../common/https";

interface Project {
  status: "pending" | "in-progress" | "completed" | string;
}

interface Projects {
  _id: string;
  clientId: string;
  clientName: string;
  title: string;
  budget: number;
  deadline: string;
  status: "pending" | "in-progress" | "completed";
}

interface ApiProject {
  _id: string;
  client: {
    _id: string;
    name: string;
  };
  title: string;
  budget: number;
  deadline: string;
  status: "pending" | "in-progress" | "completed";
}

interface ProjectPayload {
  clientId: string;
  title: string;
  budget: string;
  deadline: string;
  status: string;
}

interface InteractionPayload {
  clientId: string;
  projectId: string;
  date: string;
  interactionType: string;
  notes: string;
}

export const totalProjectsCount = async () => {
  try {
    const response = await http.get("/api/project/get-all-projects");
    return response.data.projects.length;
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return 0;
  }
};

export const reminderDueSoon = async () => {
  try {
    const response = await http.get("/api/reminder/get-reminder/due-this-week");
    return response.data.reminders.length;
  } catch (error) {
    console.error("Failed to fetch  reminders", error);
    return 0;
  }
};

export const totalProjectStatus = async (): Promise<{
  counts: { pending: number; "in-progress": number; completed: number };
  total: number;
}> => {
  try {
    const response = await http.get<{ projects: Project[] }>(
      "/api/project/get-all-projects"
    );
    const projects = response.data.projects;

    const statusCount = {
      pending: 0,
      "in-progress": 0,
      completed: 0,
    };

    projects.forEach((project) => {
      if (project.status === "pending") statusCount.pending++;
      else if (project.status === "in-progress") statusCount["in-progress"]++;
      else if (project.status === "completed") statusCount.completed++;
    });

    return {
      counts: statusCount,
      total: projects.length,
    };
  } catch (error) {
    console.log("Failed to fetch projects status", error);
    return {
      counts: { pending: 0, "in-progress": 0, completed: 0 },
      total: 0,
    };
  }
};

export const getAllProjects = async (): Promise<Projects[]> => {
  try {
    const response = await http.get<{
      message: string;
      projects: ApiProject[];
    }>("/api/project/get-all-projects");

    return response.data.projects.map((project) => ({
      _id: project._id,
      clientId: project.client._id,
      clientName: project.client.name,
      title: project.title,
      budget: project.budget,
      deadline: new Date(project.deadline).toISOString().split("T")[0],
      status: project.status,
    }));
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const deleteProject = async (id: string) => {
  try {
    const response = await http.delete(`/api/project/delete-project/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export const createProject = async (data: ProjectPayload) => {
  try {
    const response = await http.post("/api/project/create-project", data);
    return response;
  } catch (error) {
    console.error("Failed to create project:", error);
    throw error;
  }
};

export const createInteractions = async (data: InteractionPayload) => {
  try {
    const response = await http.post(
      "/api/interactionlog/create-interactionlog",
      data
    );
    return response;
  } catch (error) {
    console.error("Failed to create interface", error);
    throw error;
  }
};

export const getAllinteractions = async () => {
  try {
    const response = http.get("/get-interactionLog/:clientId/:projectId");
    return response;
  } catch (error) {
    console.error("Failed to fetch interactions", error);
    throw error;
  }
};
