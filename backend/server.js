const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage
let idCounter = 1;
let events = [{"id":idCounter++,
  "title":"Hackathon",
  "description":"a beginners guide to hackathon",
  "location":"Mumbai",
  "date":"2025-11-08T08:00",
  "maxParticipants":"50",
  "currentParticipants":0},
   {"id":idCounter++,
  "title":"Python Workshop",
  "description":"An Intermediate guide to python",
  "location":"Mumbai",
  "date":"2025-11-09T08:00",
  "maxParticipants":"25",
  "currentParticipants":0}];


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
