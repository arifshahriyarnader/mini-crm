import { http } from "../../common/https";

interface Client {
  _id: string;
  user?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}
interface ApiClient {
  _id: string;
  user?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export const getAllTotalClients = async () => {
  try {
    const response = await http.get("/api/client/all-clients");
    return response.data.length;
  } catch (error) {
    console.log(error);
  }
};

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const response = await http.get<ApiClient[]>("/api/client/all-clients");
    return response.data.map((client) => ({
      _id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      notes: client.notes,
    }));
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return [];
  }
};

export const addClient = async (data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}) => {
  try {
    const response = await http.post("/api/client/create-client", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateClient = async (data: {
  _id:string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}) => {
  try {
    const response = await http.put(`/api/client/client/${data._id}`,data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteClient = async (id: string) => {
  try {
    const response = await http.delete(`/api/client/delete-client/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export const clientProfile = async (id: string) => {
  try {
    const response = await http.get(`/api/client/client/${id}`);
    return response.data;
  } catch (error) {
    console.error("Client Profile Error:", error);
  }
};
