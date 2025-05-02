import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { clientProfile, updateClient } from "../api/services";

export const UpdateClientFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const validateEmail = (email: string) => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
  };

  const validatePhone = (phone: string) => {
    const reg = /^[0-9]{10,15}$/;
    return reg.test(phone);
  };

  useEffect(() => {
    const fetchClient = async () => {
      if (id) {
        const client = await clientProfile(id);
        if (client) {
          setFormData({
            name: client.name || "",
            email: client.email || "",
            phone: client.phone || "",
            company: client.company || "",
            notes: client.notes || "",
          });
        }
      }
    };
    fetchClient();
  }, [id]);

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
    if (!id) return;

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
      const updatedClient = await updateClient({ _id: id, ...formData });
      if (updatedClient) {
        alert("Client Updated successfully");
        navigate("/clients");
      }
    } catch (error) {
      alert("Client updated failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <Link to="/clients" className="text-blue-600 underline">
          Clients
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Client
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
            Update Client
          </button>
        </form>
      </div>
    </div>
  );
};
