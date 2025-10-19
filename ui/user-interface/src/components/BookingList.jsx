import React, { useState, useEffect } from "react";
import api from "../api";
import BookingForm from "./BookingForm";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [editBooking, setEditBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await api.get("bookings/");
      setBookings(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`booking/delete/${id}/`);
      fetchBookings();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="booking-list">
  <h2>Bookings</h2>
  <ul>
    {bookings.map((b) => (
      <li key={b.id}>
        <strong>{b.title}</strong> — {b.detail} — {b.day_of_booking} — ${b.price}
        <button onClick={() => setEditBooking(b)}>Edit</button>
        <button onClick={() => deleteBooking(b.id)}>Delete</button>
      </li>
    ))}
  </ul>
  {editBooking && (
    <BookingForm
      bookingToEdit={editBooking}
      refreshList={() => {
        fetchBookings();
        setEditBooking(null);
      }}
    />
  )}
</div>

  );
};

export default BookingList;
