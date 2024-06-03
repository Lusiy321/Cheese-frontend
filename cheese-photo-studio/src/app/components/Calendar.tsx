"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ukLocale from "@fullcalendar/core/locales/uk";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import listPlugin from "@fullcalendar/list";
import BookingModal from "./BookingModal";
import axios from "axios";
import "@/styles/calendar.css";
import styles from "@/styles/container.module.css";

const Calendar = ({ hall }: any) => {
  const [events, setEvents] = useState([
    {
      name: "Vita",
      phone: "0988855663",
      start: "2024-06-03T12:00:00+03:00",
      end: "2024-06-03T14:30:00+03:00",
      hall: "brie",
    },
    {
      name: "Gus",
      phone: "0988855663",
      date: "2024-06-04T12:00:00+03:00",
      hall: "brie",
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Загрузка событий из бэкенда
    const fetchEvents = async () => {
      //   const response = await axios.get(`/api/bookings?hall=${hall}`);
      setEvents([
        {
          name: "Vita",
          phone: "0988855663",
          start: "2024-06-03T12:00:00+03:00",
          end: "2024-06-03T14:30:00+03:00",
          hall: "brie",
        },
        {
          name: "Gus",
          phone: "0988855663",
          date: "2024-06-04T12:00:00+03:00",

          hall: "brie",
        },
      ]);
    };
    fetchEvents();
  }, [hall]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    console.log(arg.dateStr);
    setIsModalOpen(true);
  };

  return (
    <div
      style={{
        width: "95%",
        height: "650px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        margin: "100px auto",
      }}
    >
      <FullCalendar
        plugins={[resourceTimeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        events={events}
        dateClick={handleDateClick}
        allDaySlot={false}
        slotMinTime="09:00:00"
        slotMaxTime="20:00:00"
        locale={ukLocale}
      />
      {isModalOpen && (
        <BookingModal
          selectedDate={selectedDate}
          hall={hall}
          onClose={() => setIsModalOpen(false)}
          onBooking={() => {
            setIsModalOpen(false);
            setEvents;
          }}
        />
      )}
    </div>
  );
};

export default Calendar;
