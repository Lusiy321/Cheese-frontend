"use client";
import Link from "next/link";
import styles from "@/styles/main.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.titleMain}>Фотостудія Cheese</h2>
      <h3 className={styles.titleMain}>Прайс:</h3>
      <p className={styles.price}>Зал Брі- 450 грн /година</p>
      <p className={styles.price}>Зал Пармезан - 450 грн/година</p>
      <p className={styles.price}>Візажне місце - 100 грн/година</p>
      <a
        className={styles.linkInst}
        href="https://www.instagram.com/cheese_prokat/"
      >
        Прокат одягу <span className={styles.arrowRight}>&rarr;</span>
      </a>
      <button className={styles.buttonMain}>
        <Link href="/parmesan">ЗАЛ ПАРМЕЗАН</Link>
      </button>

      <button className={styles.buttonMain}>
        <Link href="/brie">ЗАЛ БРІ</Link>
      </button>
    </div>
  );
}
