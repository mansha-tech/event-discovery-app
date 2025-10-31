import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://retro-events.onrender.com/api/events";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="p-6 bg-[#fff6e1] border border-[#a55b2a] rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
      <p className="text-lg mb-1">{event.description}</p>
      <p className="text-sm text-[#523018] mb-2">
        📍 {event.location} | 🗓️ {new Date(event.date).toLocaleString()}
      </p>
      
      <p>👥 Participants: {event.currentParticipants} / {event.maxParticipants}</p>
      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 bg-[#d16d36] text-white rounded hover:bg-[#b55322]"
      >
        ← Back to Events
      </Link>
    </div>
  );
}


