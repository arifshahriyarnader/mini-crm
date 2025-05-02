import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { createReminder } from "../api/services";

export const AddReminderForm = () => {
  const { clientId, projectId } = useParams<{
    clientId: string;
    projectId: string;
  }>();
  const [formData, setFormData] = useState({
    message: "",
    dueDate: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientId || !projectId) {
        alert("Client ID or Project ID is missing");
        return;
      }
    
      if (!formData.message || !formData.dueDate) {
        alert("Message and due date are required");
        return;
      }
      

    const payload = {
      clientId,
      projectId,
      message: formData.message,
      dueDate: formData.dueDate,
    };

    try {
      const response = await createReminder(payload);
      if (response?.status === 201) {
        alert("Reminder added successfully");
        navigate("/reminders");
      }
    } catch (error) {
      console.error("Error submitting reminder:", error);
      alert("Reminder added failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <Link to="/reminders" className="text-blue-600 underline">
          Reminders
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Reminder
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Reminder message"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#5048E5] hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Add Reminder
          </button>
        </form>
      </div>
    </div>
  );
};
