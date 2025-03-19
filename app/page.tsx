"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Features from "../components/Features";
import AddTransactionForm from "../components/AddCategory";

export default function Home() {
  const router = useRouter(); // Accessing the Next.js router
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Redirects to /dashboard after the page has mounted
    router.push("");

    // Fetch categories from the backend
    fetch("http://localhost:3012/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, [router]);

  const handleSaveTransaction = (data: any) => {
    console.log("Transaction saved:", data);
  };

  return (
    <>
      <Header />
      <Features />
    </>
  );
}
