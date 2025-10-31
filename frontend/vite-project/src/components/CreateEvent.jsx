import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://retro-events.onrender.com/api/events";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    maxParticipants: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL, form)
      .then(() => {
        alert("🎉 Event Created!");
        navigate("/"); // Go back to home page after creating
      })
      .catch((err) => console.error("Error creating event", err));
  };

  return (
    <div className="app-container">
      <h2>🎨 Create a New Event</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="datetime-local"
          onChange={handleChange}
          required
        />
        <input
          name="maxParticipants"
          type="number"
          placeholder="Max Participants"
          onChange={handleChange}
          required
        />

        {/* Button Row */}
        <div className="button-row">
          <button style={{ backgroundColor: "#ffcc00" }} type="submit">✅ Create</button>
          <button style={{ backgroundColor: "#ffcc00" }} type="button" onClick={() => navigate(-1)}>
            ⬅️ Back
          </button>
        </div>
      </form>
    </div>
  );
}




