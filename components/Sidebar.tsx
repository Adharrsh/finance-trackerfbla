"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div>
      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleSidebar}>
        &#9776; {/* Clicking again will now close the sidebar */}
      </div>

      {/* Sidebar - Clicking a link closes it */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link
              href="/dashboard"
              className={styles.link}
              onClick={toggleSidebar}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className={styles.link}
              onClick={toggleSidebar}
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={styles.link}
              onClick={toggleSidebar}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/messages"
              className={styles.link}
              onClick={toggleSidebar}
            >
              Messages
            </Link>
          </li>
          <li>
            <Link
              href="/reports"
              className={styles.link}
              onClick={toggleSidebar}
            >
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
