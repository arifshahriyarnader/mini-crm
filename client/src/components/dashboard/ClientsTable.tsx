import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

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
}

export const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
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

                <button className="text-red-500 cursor-pointer">
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
