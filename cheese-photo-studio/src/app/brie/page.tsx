"use client";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

export default function Brie() {
  return (
    <div
      style={{
        margin: "0 auto",
      }}
    >
      <div
        style={{
          margin: "10px",
          textAlign: "center",
        }}
      >
        <h1>Зал Бри</h1>
      </div>

      <Calendar hall="brie" />
    </div>
  );
}
