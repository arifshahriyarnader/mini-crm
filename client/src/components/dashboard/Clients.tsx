import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getAllClients } from "../../api/services";
import { Layout } from "../../components/index";
import { ClientTable } from "./ClientsTable";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

export const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllClients();
  }, []);

  const fetchAllClients = async () => {
    try {
      const response = await getAllClients();
      setClients(response);
      console.log("All Clients:", response);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  const handleClick = () => {
    navigate("/add-client");
  };

  return (
    <Layout title="Clients">
      <div className="mb-4 flex justify-end">
        <button
          className="bg-[#5048E5] text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
          onClick={handleClick}
        >
          <IoIosAddCircleOutline size={18} />
          <span>Add Client</span>
        </button>
      </div>
      <ClientTable clients={clients} />
    </Layout>
  );
};
