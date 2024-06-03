/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "@/styles/modal.module.css";

const BookingModal = ({ selectedDate, hall, onClose, onBooking }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("/api/bookings", {
      name,
      phone,
      startTime: `${selectedDate}T${startTime}:00`,
      endTime: `${selectedDate}T${endTime}:00`,
      hall,
    });
    onBooking();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.title}>Бронювання</h2>
        <p className={styles.selectedDate}>
          Дата: {new Date(selectedDate).toLocaleDateString("uk-UA")}
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Ім'я:
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Телефон:
            <input
              className={styles.input}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Час початку:
            <input
              className={styles.input}
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
          <label>
            Час закінчення:
            <input
              className={styles.input}
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
          <button className={styles.button} type="submit">
            Підтвердити
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
