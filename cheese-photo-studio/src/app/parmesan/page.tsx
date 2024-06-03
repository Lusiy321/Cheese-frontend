"use client";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

export default function Parmesan() {
  return (
    <div>
      <div>
        <h1>Зал Пармезан</h1>
      </div>

      <Calendar hall="parmesan" />
    </div>
  );
}
