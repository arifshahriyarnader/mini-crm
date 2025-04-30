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
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
  };

  const validatePhone = (phone: string) => {
    const reg = /^[0-9]{10,15}$/;
    return reg.test(phone);
  };

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

    if (!validateEmail(formData.email)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email address",
      });
      alert("Please enter a valid email address");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrors({
        ...errors,
        phone: "Please enter a valid phone number (10-15 digits)",
      });
      alert("Please enter a valid phone number (10-15 digits)");
      return;
    }

    try {
      const response = await addClient(formData);
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
    } catch (error) {
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
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Client
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Email"
              required
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Phone"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Company"
            />
          </div>

          <div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Notes"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#5048E5] hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};
