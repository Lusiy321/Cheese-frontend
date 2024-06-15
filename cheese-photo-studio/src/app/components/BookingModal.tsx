/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/modal.module.css";
import { start } from "repl";

const BookingModal = ({ selectedDate, hall, onClose, onBooking }: any) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    setStartTime("09:00");
    setEndTime("10:00");
  }, []);
  console.log(startTime);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (startTime >= endTime) {
      toast.error("Час закінчення повинен бути пізніше часу початку.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/bookings", {
        name,
        url,
        start: `${selectedDate.split("T")[0]}T${startTime}:00`,
        end: `${selectedDate.split("T")[0]}T${endTime}:00`,
        hall,
      });

      toast.success("Бронювання відправлено", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });

      // Закрытие модального окна через 3 секунды
      setTimeout(() => {
        onClose();
        onBooking(); // Вызываем onBooking для обновления событий в календаре
      }, 3000);
    } catch (error) {
      toast.error("Цей час вже заброньовано. Спробуйте знову.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
  };

  // Валидация даты - недопущение бронирования на сегодняшнюю и предыдущие даты
  const isDateValid = new Date(selectedDate.split("T")[0]) >= new Date();

  return (
    <div className={styles.modal}>
      <ToastContainer />
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.title}>Бронювання</h2>
        <p className={styles.selectedDate}>
          На дату: {new Date(selectedDate).toLocaleDateString("uk-UA")}
        </p>
        <p className={styles.selectedDate}>
          Обирайте час с кроком у 30 хв (10:30 - 11:30 або 12:00 - 15:00)
        </p>
        {!isDateValid && (
          <p className={styles.error}>
            Неможливо забронювати на сьогоднішню або попередні дати.
          </p>
        )}
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
            Посилання на Instagram:
            <input
              className={styles.input}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              step="1800"
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
              step="1800"
              required
            />
          </label>
          <button
            className={styles.button}
            type="submit"
            disabled={!isDateValid}
          >
            Підтвердити
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
