"use client";

import { useState } from "react";
import styles from "./AddTransactionForm.module.css";

const AddTransactionForm = ({ onSave }: { onSave: (data: any) => void }) => {
  const [amount, setAmount] = useState<string>(""); // Keep it as a string to start blank
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("income");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return; // Ensure no empty submissions
    onSave({ amount: parseFloat(amount), category, date, type }); // Convert amount to a number
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Add Transaction</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} // Keep as string for blank input
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
        onChange={(e) => setType(e.target.value as "income" | "expense")}
        className={styles.select}
      >
        <option value="income">Deposit</option>
        <option value="expense">Withdrawal</option>
      </select>

      <button type="submit" className={styles.button}>
        Save Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;
