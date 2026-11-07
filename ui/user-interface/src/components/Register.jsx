import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = ({ setUsername }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "", first_name: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("register/", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_id", res.data.user_id);
      if (setUsername && res.data.username) {
        setUsername(res.data.username);
      }
      setMessage("Registration successful!");
      navigate("/"); 
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === "object") {
        const errorMessages = Object.entries(data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(" ") : val}`)
          .join(" | ");
        setMessage(errorMessages || "Error while registering!");
      } else {
        setMessage(err.response?.data?.message || err.message || "Error while registering!");
      }
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username (min 3 chars, no spaces)" onChange={handleChange} required />
        <input type="text" name="first_name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password (min 8 chars, not all numbers)" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p className={message && !message.includes("successful") ? "error" : "success"}>{message}</p>
    </div>
  );
};

export default Register;
