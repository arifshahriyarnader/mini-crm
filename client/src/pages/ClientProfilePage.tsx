import { useNavigate, useParams } from "react-router";
import { Layout } from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { clientProfile } from "../api/services";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

export const ClientProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const data = await clientProfile(id!);
        setClient(data);
      } catch (error) {
        console.log("Failed to fetch client profile", error);
      }
    };

    if (id) fetchClientProfile();
  }, [id]);

  const handleProject = (clientId: string) => {
    navigate(`/add-project/${clientId}`);
  };

  return (
    <Layout title="Client Profile">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Phone</th>
              <th className="p-2 border-b">Company</th>
              <th className="p-2 border-b">Notes</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {client && (
              <tr>
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">{client.phone}</td>
                <td className="p-2">{client.company || "N/A"}</td>
                <td className="p-2">{client.notes || "N/A"}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-[#5048E5] text-white px-2 py-1 rounded cursor-pointer"
                    onClick={() => handleProject(client._id)}
                  >
                    Add Project
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
