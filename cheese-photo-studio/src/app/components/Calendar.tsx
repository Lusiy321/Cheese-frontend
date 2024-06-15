/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import ukLocale from "@fullcalendar/core/locales/uk";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import BookingModal from "./BookingModal";
import axios from "axios";
import "@/styles/calendar.css";

const Calendar = ({ hall }: any) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const eventsForm = [
    {
      id: "1",
      title: "Бронь",
      start: "2024-06-20T10:00:00",
      end: "2024-06-20T12:00:00",
      allDay: false,
      url: "http://example.com/",
      classNames: ["custom-class"],
      editable: false,
      startEditable: false,
      durationEditable: false,
      resourceId: "a",
      extendedProps: {
        description: "Описание события 1",
        price: 100,
      },
    },
    {
      id: "2",
      title: "Бронь",
      start: "2024-06-20T13:00:00",
      end: "2024-06-20T15:00:00",
      allDay: false,
      url: "http://example.com/",
      classNames: ["custom-class"],
      editable: true,
      startEditable: true,
      durationEditable: true,
      resourceId: "a",
      extendedProps: {
        description: "Описание события 1",
        price: 100,
      },
    },
  ];

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

  const renderEventContent = (eventInfo: any) => {
    const isFreeSlot = true; // Add your logic to determine if the slot is free
    const price = "100$"; // Replace with your price logic
    return (
      <div
        style={{
          height: "100%",
          backgroundColor: isFreeSlot ? "green" : "white",
          color: isFreeSlot ? "white" : "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFreeSlot && price}
      </div>
    );
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
        plugins={[
          timeGridPlugin,
          dayGridPlugin,
          resourceTimeGridPlugin,
          interactionPlugin,
          listPlugin,
        ]}
        initialView="timeGridWeek"
        events={eventsForm}
        dateClick={handleDateClick}
        allDaySlot={false}
        slotLabelFormat={{ hour: "numeric", minute: "2-digit", hour12: false }}
        slotMinTime="09:00:00"
        slotMaxTime="20:00:00"
        locale={ukLocale}
        eventColor="black"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay,listWeek",
        }}
        selectable={true}
        eventContent={(eventInfo) => (
          <div>
            <p>{eventInfo.timeText}</p> <br />
            <p>{eventInfo.event.title}</p>
          </div>
        )}
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
