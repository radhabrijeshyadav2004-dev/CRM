const Ticket = require("../models/Ticket");

//Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      subject,
      description,
    } = req.body;

    const count = await Ticket.countDocuments();

    const ticket = await Ticket.create({
      ticketId: `TKT-${count + 1}`,
      customerName,
      customerEmail,
      subject,
      description,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all tickets with optional filters
exports.getTickets = async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { customerEmail: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { ticketId: { $regex: search, $options: "i" } },
      ];
    }

    const tickets = await Ticket.find(query).sort({
      createdAt: -1,
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      ticketId: req.params.ticketId,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update ticket status
exports.updateTicket = async (req, res) => {
  try {
    const { status, note } = req.body;

    const ticket = await Ticket.findOne({
      ticketId: req.params.ticketId,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (status) {
      ticket.status = status;
    }

    if (note) {
      ticket.notes.push({
        text: note,
      });
    }

    await ticket.save();

    res.json({
      success: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};