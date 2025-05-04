import { useNavigate } from "react-router";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Layout } from "../../components/index";
import { ClientTable } from "./ClientsTable";
import { useClient } from "../../hooks/useClient";

export const Clients: React.FC = () => {
  const { clients, setClients, loading, error, handleDelete } = useClient();

  const navigate = useNavigate();

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
        <ClientTable
          clients={clients}
          setClients={setClients}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="text-center py-8">
          <p>No clients found</p>
        </div>
      )}
    </Layout>
  );
};
