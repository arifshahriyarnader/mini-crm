import { http } from "../../common/https";

interface Project {
  status: "pending" | "in-progress" | "completed" | string;
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
