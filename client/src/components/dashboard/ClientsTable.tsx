import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { deleteClient } from "../../api/services";

interface Client {
  id: string;
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

export const ClientTable: React.FC<ClientTableProps> = ({ clients,setClients }) => {
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteClient(id);
        console.log("Clients deleted", response)
        if (response?.status === 200) {
          alert("Client deleted successfully");
          setClients(prevClients => prevClients.filter(client => client.id !== id)); 
        } else {
          alert("Failed to delete client");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Something went wrong during deletion");
      }
    }
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
            <tr key={client.id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2">{client.phone}</td>
              <td className="p-2">{client.company}</td>
              <td className="p-2">{client.notes}</td>
              <td className="p-2 flex gap-2">
                <button className="bg-[#5048E5] text-white px-2 py-1 rounded cursor-pointer">
                  View
                </button>

                <button className="text-blue-500 cursor-pointer">
                  <FaEdit size={20} />
                </button>

                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(client.id)}
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
