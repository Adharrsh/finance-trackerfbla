"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link href="/dashboard" className={styles.link}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/transactions" className={styles.link}>
              Transactions
            </Link>
          </li>
          <li>
            <Link href="/profile" className={styles.link}>
              Profile
            </Link>
          </li>
          <li>
            <Link href="/messages" className={styles.link}>
              Messages
            </Link>
          </li>
          <li>
            <Link href="/reports" className={styles.link}>
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
