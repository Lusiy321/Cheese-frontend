"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

export default function Parmesan() {
  return (
    <div
      style={{
        margin: "0 auto",
      }}
    >
      <button>
        <Link href="/">Назад</Link>
      </button>
      <div
        style={{
          margin: "10px",
          textAlign: "center",
        }}
      >
        <h1>Зал Пармезан</h1>
      </div>

      <Calendar hall="parmesan" />
    </div>
  );
}
