import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getAllClients } from "../../api/services";
import { Layout } from "../../components/index";
import { ClientTable } from "./ClientsTable";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

export const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllClients();
  }, []);

  const fetchAllClients = async () => {
    try {
      setLoading(true);
      const data = await getAllClients();
      console.log("fetch clients:...", data);
      setClients(data);
    } catch (error) {
      setError("Failed to load clients");
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/add-client");
  };

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>{error}</div>;

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
      {clients.length > 0 ? (
        <ClientTable clients={clients} setClients={setClients} />
      ) : (
        <div className="text-center py-8">
          <p>No clients found</p>
        </div>
      )}
    </Layout>
  );
};
