const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage
let events = [];
let idCounter = 1;

// POST /api/events - Create an event
app.post("/api/events", (req, res) => {
  const { title, description, location, date, maxParticipants } = req.body;
  const newEvent = {
    id: idCounter++,
    title,
    description,
    location,
    date,
    maxParticipants,
    currentParticipants: 0,
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// GET /api/events - List all events
app.get("/api/events", (req, res) => {
  const { location } = req.query;
  if (location) {
    return res.json(events.filter(e => e.location.toLowerCase().includes(location.toLowerCase())));
  }
  res.json(events);
});

// GET /api/events/:id - Get event details
app.get("/api/events/:id", (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
