"use client";

import { useState } from "react";
import styles from "./AddTransactionForm.module.css";

const AddTransactionForm = ({ onSave }: { onSave: (data: any) => void }) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<"Deposit" | "Withdrawal">("Deposit");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    const transaction = { amount, category, date, type };
    console.log("transaction" + JSON.stringify(transaction));
    try {
      console.log("before calling api");
      const response = await fetch("http://localhost:3012/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      console.log("after calling api");
      console.log(response);
      if (response.ok) {
        console.log("Transaction saved successfully");
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

  const [newcategory, setNewCategory] = useState<string>("");
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    try {
      const response = await fetch("http://localhost:3012/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      });

      if (response.ok) {
        console.log("Categories saved successfully");
        setNewCategory("");
      } else {
        console.error("Error adding category");
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
          value={newcategory}
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

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.input}
        />

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

export default AddTransactionForm;
