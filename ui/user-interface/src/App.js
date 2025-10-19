import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";


const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav>
      <Link to="/">Bookings</Link>
      <Link to="/new">New Booking</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookingList />} />
        <Route path="/new" element={<BookingForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
