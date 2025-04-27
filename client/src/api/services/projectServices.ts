import { http } from "../../common/https";

export const totalProjectsCount = async () => {
  try {
    const response = await http.get("/api/project/get-all-projects");
    return response.data.projects.length;
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return 0;
  }
};
