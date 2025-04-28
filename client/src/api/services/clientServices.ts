import { http } from "../../common/https";

export const getAllTotalClients = async () => {
  try {
    const response = await http.get("/api/client/all-clients");
    return response.data.length;
  } catch (error) {
    console.log(error);
  }
};

export const getAllClients = async () => {
  try {
    const response = await http.get("/api/client/all-clients");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addClient = async (data:{name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;}) => {
  try {
    const response = await http.post("/api/client/create-client",data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteClient =async(id: string) =>{
  try{
    const response= await http.delete(`/api/client/delete-client/${id}`)
    return response;
  }
  catch(error){
    console.log(error)
    throw error;
  }
}