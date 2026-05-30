import { useEffect, useState } from "react";
import API from "../api/ticketApi";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import TicketCard from "../components/TicketCard";

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchTickets = async () => {
    try {
      const res = await API.get(
        `/tickets?search=${search}&status=${status}`
      );

      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Support Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Manage and track customer support tickets
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Tickets
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {tickets.length}
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Open
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {openTickets}
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                In Progress
              </p>

              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                {progressTickets}
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Closed
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {closedTickets}
              </h2>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              
              <div className="flex-1">
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                />
              </div>

              <div className="md:w-56">
                <StatusFilter
                  status={status}
                  setStatus={setStatus}
                />
              </div>

            </div>
          </div>

          {/* Tickets */}
          {tickets.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
              <h3 className="text-lg font-medium text-gray-700">
                No Tickets Found
              </h3>

              <p className="text-gray-500 mt-2">
                Create a ticket or adjust your filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket._id}
                  ticket={ticket}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;