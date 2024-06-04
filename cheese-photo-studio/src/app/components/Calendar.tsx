/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import ukLocale from "@fullcalendar/core/locales/uk";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import listPlugin from "@fullcalendar/list";
import BookingModal from "./BookingModal";
import axios from "axios";
import "@/styles/calendar.css";

const Calendar = ({ hall }: any) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    const response = await axios.get(`http://localhost:5000/bookings/${hall}`);
    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, [hall]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true);
  };

  return (
    <div
      style={{
        width: "90%",
        height: "800px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        margin: "10px auto",
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
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay,listWeek",
        }}
      />

      {""}

      {isModalOpen && (
        <BookingModal
          selectedDate={selectedDate}
          hall={hall}
          onClose={() => setIsModalOpen(false)}
          onBooking={() => {
            setIsModalOpen(false);
            fetchEvents();
          }}
        />
      )}
    </div>
  );
};

export default Calendar;
