"use client";
import { useState } from "react";
import styles from "./GetReport.module.css";

const Page = () => {
  const [transactions, setTransactions] = useState<
    { category: string; amount: number; transactiontype: string }[]
  >([]);
  const [startdate, setStartDate] = useState<string>("");
  const [enddate, setEndDate] = useState<string>("");
  const [csvData, setCsvData] = useState<string>("");

  const generateCsv = (
    data: { category: string; amount: number; transactiontype: string }[]
  ) => {
    const headers = ["Category", "Amount", "Transaction Type"];
    const rows = data.map((transaction) => [
      transaction.category,
      Number(transaction.amount).toFixed(2),
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

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit");
    console.log("Start Date:", startdate);
    console.log("End Date:", enddate);

    e.preventDefault();
    if (!startdate || !enddate) {
      console.error("Both start and end dates are required.");
      return;
    }

    const transactiondate = {
      startdate: new Date(startdate).toISOString().split("T")[0],
      enddate: new Date(enddate).toISOString().split("T")[0],
    };

    try {
      console.log("Fetching report...");
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
            "category" in item && "amount" in item && "transactiontype" in item
        )
      ) {
        setTransactions(data);
        generateCsv(data);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error:", error);
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
          Fetch Report
        </button>
      </form>

      <div className={styles.recentTrxContainer}>
        <h2>Transaction Report</h2>
        {transactions.length > 0 ? (
          <div>
            <table className={styles.transactionsTable}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Transaction Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.category}</td>
                    <td>${Number(transaction.amount).toFixed(2)}</td>
                    <td>{transaction.transactiontype}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={downloadCsv}>Download CSV</button>
          </div>
        ) : (
          <p>No transactions found for the selected period.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
