import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://retro-events.onrender.com/api/events";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setEvents(res.data))
      .catch(err => console.error("Error fetching events", err));
  }, []);

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleCreateClick = () => {
    navigate("/create");
  };

  return (
    <div>
      <h2>🌈 Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events yet — be the first to create one!</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => handleEventClick(event.id)}
            style={{ cursor: "pointer" }}
          >
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>📍 {event.location}</p>
            <p>📅 {new Date(event.date).toLocaleString()}</p>
          </div>
        ))
      )}
      <button
        onClick={handleCreateClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#ffcc00",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontFamily: "'Press Start 2P', cursive",
        }}
      >
        ➕ Create Event
      </button>
    </div>
  );
}

