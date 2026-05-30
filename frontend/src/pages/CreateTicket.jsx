import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/ticketApi";
import Navbar from "../components/Navbar";

const CreateTicket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tickets", formData);

      alert("Ticket Created");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto p-5">
        <h1 className="text-3xl font-bold mb-5">
          Create Ticket
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="customerName"
            placeholder="Customer Name"
            className="border p-2 w-full"
            onChange={handleChange}
          />

          <input
            name="customerEmail"
            placeholder="Customer Email"
            className="border p-2 w-full"
            onChange={handleChange}
          />

          <input
            name="subject"
            placeholder="Subject"
            className="border p-2 w-full"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 w-full"
            rows="5"
            onChange={handleChange}
          />

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTicket;