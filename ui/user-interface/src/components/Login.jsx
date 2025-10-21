import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = ({ setUsername }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("login/", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_id", res.data.user_id);

      if (res.data.username) {
        setUsername(res.data.username);
      } else {
        const userRes = await api.get("current-user/", {
          headers: { Authorization: `Token ${res.data.token}` },
        });
        setUsername(userRes.data.username);
      }

      setMessage("Login successful!");
      navigate("/");
    } catch (err) {
      setMessage("Invalid credentials!");
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className={message.includes("Invalid") ? "error" : "success"}>
        {message}
      </p>
    </div>
  );
};

export default Login;
