"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Фотостудія Cheese</h1>
      <button>
        <Link href="/parmesan">Зал Пармезан</Link>
      </button>
      <button>
        <Link href="/brie">Зал Брі</Link>
      </button>
    </div>
  );
}
