import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { addClient } from "../api/services";

export const AddClientFormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });
  const navigate=useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response=await addClient(formData)
      console.log("client added:", response);
      if (response?.status === 201) {
        alert("Client Added Successfully");
        navigate("/clients");
      } else {
        alert("Client addition failed");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        notes: "",
      });

    }
    catch(error){
      console.error("Failed to add client:", error);
    }

   
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <Link to="/dashboard" className="text-blue-600 underline">
          Dashboard
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add New Client</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Name"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Email"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Phone"
            required
          />

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Company"
          />

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Notes"
            rows={3}
          />

          <button
            type="submit"
            className="w-full bg-[#5048E5] hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};
