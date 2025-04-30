import { Layout } from "../../components/index";

export const Interactions = () => {
  return (
    <Layout title="Interactions">
      <div className="overflow-x-auto">
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
            <tr>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2 capitalize"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
