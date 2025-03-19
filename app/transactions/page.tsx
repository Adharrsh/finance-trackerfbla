"use client";
import { useState, useEffect } from "react";
import styles from "./AddTransactionForm.module.css";

const Page = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<"Deposit" | "Withdrawal">("Deposit");

  useEffect(() => {
    // Fetch categories from the backend
    fetch("http://localhost:3012/api/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;

    try {
      const response = await fetch("http://localhost:3012/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: newCategory }),
      });

      if (response.ok) {
        const updatedCategoriesResponse = await fetch(
          "http://localhost:3012/api/categories"
        );
        if (updatedCategoriesResponse.ok) {
          const updatedCategories = await updatedCategoriesResponse.json();
          setCategories(updatedCategories);
        }
        setNewCategory("");
      } else {
        console.error("Error adding category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    const transaction = { amount, category, date, type };
    try {
      const response = await fetch("http://localhost:3012/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        setAmount(0);
        setCategory("");
        setDate("");
      } else {
        console.error("Error saving transaction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleAddCategory} className={styles.form}>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Category
        </button>
      </form>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Add Transaction</h2>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className={styles.input}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "Deposit" | "Withdrawal")}
          className={styles.select}
        >
          <option value="Deposit">Deposit</option>
          <option value="Withdrawal">Withdrawal</option>
        </select>
        <button type="submit" className={styles.button}>
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default Page;
