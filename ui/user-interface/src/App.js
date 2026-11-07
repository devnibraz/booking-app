import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { getToken } from "./utils/helpers";
import api from "./api";

const Navbar = ({ username, setUsername }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !username) {
      api
        .get("current-user/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setUsername(res.data.username);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [username, setUsername]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUsername("");
    navigate("/login");
  };

  return (
    <nav>
      {getToken() ? (
        <>
          <Link to="/">Bookings</Link>
          <Link to="/new">New Booking</Link>
          <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
            Welcome, {username || "Loading..."}
          </span>
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

const App = () => {
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <Navbar username={username} setUsername={setUsername} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BookingList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register setUsername={setUsername} />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
