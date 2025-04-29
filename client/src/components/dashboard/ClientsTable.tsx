import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { deleteClient, getAllClients } from "../../api/services";
import { useNavigate } from "react-router";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

interface ClientTableProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  setClients,
}) => {
  const navigate = useNavigate();

  const handleDelete = async (_id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmDelete) return;

    try {
      await deleteClient(_id);
      setClients((prev) => prev.filter((client) => client._id !== _id));
      alert("Client deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete client. Please try again.");
      const updatedClients = await getAllClients();
      setClients(updatedClients);
    }
  };

  const handleClientProfile = () => {
    navigate("/client-profile");
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border-b">Serial No</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Phone</th>
            <th className="p-2 border-b">Company</th>
            <th className="p-2 border-b">Notes</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client._id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2">{client.phone}</td>
              <td className="p-2">{client.company}</td>
              <td className="p-2">{client.notes}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-[#5048E5] text-white px-2 py-1 rounded cursor-pointer"
                  onClick={handleClientProfile}
                >
                  View
                </button>

                <button className="text-blue-500 cursor-pointer">
                  <FaEdit size={20} />
                </button>

                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(client._id)}
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
