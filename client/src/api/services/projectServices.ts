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

export const reminderDueSoon = async() => {
  try{
const response= await http.get("/api/reminder/get-reminder/due-this-week");
return response.data.reminders.length

  }
  catch(error){
    console.error("Failed to fetch  reminders", error);
    return 0;
  }
}