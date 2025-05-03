import { useEffect, useState } from "react";
import { Layout } from "../../components/index";
import { getAllReminder } from "../../api/services";

interface Reminders {
  _id: string;
  client: { name: string };
  project: { title: string };
  message: string;
  dueDate: string;
}

export const Reminder = () => {
  const [reminders, setReminders] = useState<Reminders[]>([]);

  useEffect(() => {
    const fetchAllReminders = async () => {
      try {
        const response = await getAllReminder();
        setReminders(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllReminders();
  }, []);
  return (
    <Layout title="Reminders">
      <div className="hidden md:block overflow-x-auto">
        {reminders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            You have no reminders
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 border-b">Client</th>
                <th className="p-2 border-b">Project</th>
                <th className="p-2 border-b">Message</th>
                <th className="p-2 border-b">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr>
                  <td className="p-2">{reminder.client?.name || "N/A"}</td>
                  <td className="p-2">{reminder.project?.title}</td>
                  <td className="p-2">{reminder.message}</td>
                  <td className="p-2">
                    {new Date(reminder.dueDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4 px-4">
        {reminders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            You have no reminders
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder._id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <p>
                <span className="font-semibold">Client:</span>{" "}
                {reminder.client?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Project:</span>{" "}
                {reminder.project?.title || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Message:</span>{" "}
                {reminder.message}
              </p>
              <p>
                <span className="font-semibold">Due Date:</span>{" "}
                {new Date(reminder.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};
