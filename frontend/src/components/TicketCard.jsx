import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="font-bold text-lg">
        {ticket.ticketId}
      </h2>

      <p>{ticket.customerName}</p>

      <p>{ticket.subject}</p>

      <p className="font-medium">
        Status: {ticket.status}
      </p>

      <Link
        to={`/ticket/${ticket.ticketId}`}
        className="text-blue-500"
      >
        View Details
      </Link>
    </div>
  );
};

export default TicketCard;