import { Routes, Route, useNavigate } from "react-router-dom";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import EventDetail from "./components/EventDetail";
import "./styles/retro.css";

export default function App() {
  

  return (
    <div>
      <h1> Retro Events 🎶</h1>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}
