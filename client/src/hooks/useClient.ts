import { useEffect, useState } from "react";
import { getAllClients, deleteClient } from "../api/services";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

export const useClient = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  return { clients, setClients, loading, error, fetchAllClients, handleDelete };
};
