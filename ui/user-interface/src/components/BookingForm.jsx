import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { today } from "../utils/helpers";

const BookingForm = ({ bookingToEdit, refreshList }) => {
  const [form, setForm] = useState({
    title: "",
    detail: "",
    day_of_booking: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    if (bookingToEdit) setForm(bookingToEdit);
  }, [bookingToEdit, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bookingToEdit) {
        await api.put(`booking/edit/${bookingToEdit.id}/`, form);
        setMessage("Booking updated successfully!");
      } else {
        await api.post("booking/new/", form);
        setMessage("Booking created successfully!");
        setForm({
          title: "",
          detail: "",
          day_of_booking: "",
          price: "",
        });
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      setMessage("Error while creating booking!");
    }
  };

  return (
    <div className="form-container">
      <h2>{bookingToEdit ? "Edit Booking" : "Create Booking"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          minLength={3}
        />

        <input
          type="text"
          name="detail"
          placeholder="Detail"
          value={form.detail}
          onChange={handleChange}
        />

        <input
          min={today()}
          type="date"
          name="day_of_booking"
          placeholder="Day of Booking"
          value={form.day_of_booking}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          min={1}
        />

        <button type="submit">
          {bookingToEdit ? "Update Booking" : "Create Booking"}
        </button>
      </form>

      <p className={message.includes("Error") ? "error" : "success"}>
        {message}
      </p>
    </div>
  );
};

export default BookingForm;
