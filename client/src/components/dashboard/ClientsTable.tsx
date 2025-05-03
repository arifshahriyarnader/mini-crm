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

  const handleEdit = async (_id: string) => {
    navigate(`/update-client/${_id}`);
  };

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

  const handleClientProfile = async (id: string) => {
    navigate(`/client-profile/${id}`);
  };

  return (
    <>
      <div className="hidden sm:block overflow-x-auto">
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
                <td className="p-2 ">{client.email}</td>
                <td className="p-2 ">{client.phone}</td>
                <td className="p-2 ">{client.company}</td>
                <td className="p-2 ">{client.notes}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-[#5048E5] text-white px-2 py-1 rounded cursor-pointer"
                    onClick={() => handleClientProfile(client._id)}
                  >
                    View
                  </button>
                  <button
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(client._id)}
                  >
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

      {/* Card layout for small screens */}
      <div className="sm:hidden space-y-4">
        {clients.map((client, index) => (
          <div
            key={client._id}
            className="border border-gray-300 p-4 rounded shadow bg-white"
          >
            <p>
              <strong>Serial No:</strong> {index + 1}
            </p>
            <p>
              <strong>Name:</strong> {client.name}
            </p>
            <p>
              <strong>Email:</strong> {client.email}
            </p>
            <p>
              <strong>Phone:</strong> {client.phone}
            </p>
            <p>
              <strong>Company:</strong> {client.company}
            </p>
            <p>
              <strong>Notes:</strong> {client.notes}
            </p>
            <div className="flex gap-3 mt-3">
              <button
                className="bg-[#5048E5] text-white px-2 py-1 rounded"
                onClick={() => handleClientProfile(client._id)}
              >
                View
              </button>
              <button
                className="text-blue-500"
                onClick={() => handleEdit(client._id)}
              >
                <FaEdit size={20} />
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(client._id)}
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
