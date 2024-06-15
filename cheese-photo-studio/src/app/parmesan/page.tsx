"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "@/styles/main.module.css";
const Calendar = dynamic(() => import("../components/Calendar"), {
  ssr: false,
});

export default function Parmesan() {
  return (
    <div className={styles.container}>
      <button className={styles.buttonMain}>
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
