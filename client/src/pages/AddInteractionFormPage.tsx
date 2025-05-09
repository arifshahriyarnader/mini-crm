import { useState } from "react";
import { Link, useParams,useNavigate } from "react-router";
import { createInteractions } from "../api/services";

export const AddInteractionFormPage = () => {
  const { clientId, projectId } = useParams<{ clientId: string; projectId: string }>();
  const [formData, setFormData] = useState({
    date: "",
    type: "call",
    notes: "",
  });
  const navigate=useNavigate()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !projectId) {
      alert("Client ID or Project is missing");
      return;
    }
    const payload = {
      clientId,
      projectId,
      date: formData.date,
      interactionType: formData.type,
      notes: formData.notes,
    };
    try{
    
      const response=await createInteractions(payload)
      if(response?.status === 201){
        alert("Interaction added successfully")
        navigate("/interactions")
      }
    }
    catch(error){
      console.error("Error submitting interaction:", error);
    }

    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <Link to="/interactions" className="text-blue-600 underline">
          Interactions
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Interaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interaction Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          >
            <option value="call">Call</option>
            <option value="meeting">Meeting</option>
            <option value="email">Email</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter notes here..."
          ></textarea>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#5048E5] hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Add Interaction
          </button>
        </form>
      </div>
    </div>
  );
};
