import { http } from "../../common/https";

export const getAllTotalClients = async () => {
  try {
    const response = await http.get("/api/client/all-clients");
    return response.data.length;
  } catch (error) {
    console.log(error);
  }
};
