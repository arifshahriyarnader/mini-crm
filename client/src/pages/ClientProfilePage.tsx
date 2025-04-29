import { Layout } from "../components/layout/Layout";

export const ClientProfilePage = () => {
  return (
    <Layout title="Client Profile">
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
            <tr>
              <td className="p-2">nader</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2 flex gap-2">
                <button className="bg-[#5048E5] text-white px-2 py-1 rounded cursor-pointer">
                  Add Project
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
