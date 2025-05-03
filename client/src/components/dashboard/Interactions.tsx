import { useEffect, useState } from "react";
import { Layout } from "../../components/index";
import { getAllInteractions } from "../../api/services";

interface InteractionLog {
  _id: string;
  client: { name: string };
  project: { title: string };
  interactionType: string;
  notes: string;
  date: string;
}

export const Interactions = () => {
  const [interactionLogs, setInteractionLogs] = useState<InteractionLog[]>([]);

  useEffect(() => {
    const fetchAllInteractionsLogs = async () => {
      try {
        const response = await getAllInteractions();
        setInteractionLogs(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllInteractionsLogs();
  }, []);

  return (
    <Layout title="Interactions">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border-b">Client</th>
              <th className="p-2 border-b">Project</th>
              <th className="p-2 border-b">Interaction Type</th>
              <th className="p-2 border-b">Notes</th>
              <th className="p-2 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {interactionLogs.map((interaction) => (
              <tr key={interaction._id}>
                <td className="p-2">{interaction.client?.name || "N/A"}</td>
                <td className="p-2">{interaction.project?.title || "N/A"}</td>
                <td className="p-2 capitalize">
                  {interaction.interactionType}
                </td>
                <td className="p-2">{interaction.notes}</td>
                <td className="p-2">
                  {new Date(interaction.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4 px-4 overflow-x-hidden">
        {interactionLogs.map((interaction) => (
          <div
            key={interaction._id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <p>
              <span className="font-semibold">Client:</span>{" "}
              {interaction.client?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Project:</span>{" "}
              {interaction.project?.title || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Type:</span>{" "}
              <span className="capitalize">{interaction.interactionType}</span>
            </p>
            <p>
              <span className="font-semibold">Notes:</span> {interaction.notes}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(interaction.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};
