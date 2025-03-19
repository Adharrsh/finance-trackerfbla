"use client";
import { useState, useEffect } from "react";
import styles from "./GetReport.module.css";

const Reports = () => {
  const [transactions, setTransactions] = useState<
    {
      id: number;
      category: string;
      amount: number | string;
      transactiontype: string;
    }[]
  >([]);
  const [startdate, setStartDate] = useState<string>("");
  const [enddate, setEndDate] = useState<string>("");
  const [csvData, setCsvData] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startdate || !enddate) return;

    const transactiondate = { startdate, enddate };
    try {
      const response = await fetch("http://localhost:3012/api/getreport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactiondate),
      });
      if (!response.ok) {
        throw new Error("Error fetching transactions");
      }

      const data = await response.json();
      console.log("Fetched transactions data:", data);

      if (
        Array.isArray(data) &&
        data.every(
          (item) =>
            "id" in item &&
            "category" in item &&
            "amount" in item &&
            "transactiontype" in item
        )
      ) {
        setTransactions(data);
        generateCsv(data); // Call generateCsv after setting transactions
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const generateCsv = (
    data: {
      id: number;
      category: string;
      amount: number | string;
      transactiontype: string;
    }[]
  ) => {
    const headers = ["Category", "Amount", "Transaction Type"];
    const rows = data.map((transaction) => [
      transaction.category,
      typeof transaction.amount === "number"
        ? transaction.amount.toFixed(2)
        : transaction.amount,
      transaction.transactiontype,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    setCsvData(csvContent);
  };

  const downloadCsv = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3012/api/transactions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting transaction");
      }
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Spending Report</h2>
        <input
          type="date"
          value={startdate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Get Report
        </button>
      </form>
      <div>
        <h2>Transactions</h2>
        {transactions.length > 0 ? (
          <>
            <table className={styles.transactionsTable}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Transaction Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.category}</td>
                    <td>
                      {typeof transaction.amount === "number"
                        ? transaction.amount.toFixed(2)
                        : transaction.amount}
                    </td>
                    <td>{transaction.transactiontype}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={downloadCsv} className={styles.button}>
              Download CSV
            </button>
          </>
        ) : (
          <p>No transactions found for the selected period.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
