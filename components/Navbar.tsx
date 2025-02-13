"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  const { user, isLoaded } = useUser();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
        <Link href="/" className="navbar-brand">
          Spending Smartly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {isLoaded && user && (
                <>
                  <Link href="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <UserButton afterSwitchSessionUrl="/" />
                </>
              )}
            </li>
            <li className="nav-item">
              <Link href="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/signup" className="nav-link">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
