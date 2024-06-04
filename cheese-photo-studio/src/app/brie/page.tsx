"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

export default function Brie() {
  return (
    <div>
      <button>
        <Link href="/">Назад</Link>
      </button>
      <div
        style={{
          margin: "10px",
          textAlign: "center",
        }}
      >
        <h1>Зал Брі</h1>
      </div>

      <Calendar hall="brie" />
    </div>
  );
}
