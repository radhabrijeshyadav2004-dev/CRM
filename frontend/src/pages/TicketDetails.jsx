import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../api/ticketApi";
import Navbar from "../components/Navbar";

const TicketDetails = () => {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);

  const [status, setStatus] = useState("");

  const [note, setNote] = useState("");

  const fetchTicket = async () => {
    try {
      const res = await API.get(
        `/tickets/${ticketId}`
      );

      setTicket(res.data);

      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const updateTicket = async () => {
    try {
      await API.put(`/tickets/${ticketId}`, {
        status,
        note,
      });

      alert("Updated");

      fetchTicket();
    } catch (error) {
      console.log(error);
    }
  };

  if (!ticket)
    return <h2 className="p-5">Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl font-bold mb-4">
          {ticket.ticketId}
        </h1>

        <div className="space-y-3">
          <p>
            <strong>Name:</strong>{" "}
            {ticket.customerName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {ticket.customerEmail}
          </p>

          <p>
            <strong>Subject:</strong>{" "}
            {ticket.subject}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {ticket.description}
          </p>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border p-2"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>

          <textarea
            placeholder="Add Note"
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            className="border p-2 w-full"
            rows="4"
          />

          <button
            onClick={updateTicket}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Ticket
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">
            Notes
          </h2>

          {ticket.notes?.map((n, index) => (
            <div
              key={index}
              className="border p-2 mb-2"
            >
              {n.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TicketDetails;