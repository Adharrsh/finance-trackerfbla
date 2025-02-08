"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Features from "../components/Features";

export default function Home() {
  const router = useRouter(); // Accessing the Next.js router

  useEffect(() => {
    // Redirects to /dashboard after the page has mounted
    router.push("");
  }, [router]);

  return (
    <>
      <Header />
      <Features />
    </>
  );
}
