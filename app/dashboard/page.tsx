"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "../styles/Dashboard.module.css";
import CustomPieChart from "../../components/PieChart";

const Dashboard = () => {
  const [balance, setBalance] = useState<number>(0);
  const [categories, setCategories] = useState<
    { category: string; amount: number }[]
  >([]);
  const [categoriesdep, setCategoriesDep] = useState<
    { category: string; amount: number }[]
  >([]);
  const [categoryrecenttrx, setCategoriesRecentTRx] = useState<String>(0);
  const [amountrecenttrx, setAmountRecentTrx] = useState<number>(0);
  const [transactiontype, setTransactionType] = useState<String>(0);
  const [transactions, setTransactions] = useState<
    { category: string; amount: number; transactiontype: string }[]
  >([]);
  // Fetch balance from the backend
  useEffect(() => {
    fetch("http://localhost:3012/api/balance")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched balance:", data);
        setBalance(data.balance);
      })
      .catch((error) => console.error("Error fetching balance:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3012/api/categories-amounts-deposits")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories dep data:", data);

        // Ensure the data is in the correct format before setting state
        if (
          Array.isArray(data) &&
          data.every((item) => "category" in item && "amount" in item)
        ) {
          setCategoriesDep(data);
          console.log("Categories Dep data set:", data);
        } else {
          console.error("Invalid data format:", data);
          setCategoriesDep(null);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch categories and their amounts
  useEffect(() => {
    fetch("http://localhost:3012/api/categories-amounts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories data:", data);

        // Ensure the data is in the correct format before setting state
        if (
          Array.isArray(data) &&
          data.every((item) => "category" in item && "amount" in item)
        ) {
          setCategories(data);
          console.log("Categories data set:", data);
        } else {
          console.error("Invalid data format:", data);
          setCategories(null);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch categories and their amounts
  useEffect(() => {
    fetch("http://localhost:3012/api/recenttransactions")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched recent transactions data:", data);

        // Ensure the data is in the correct format before setting state
        if (
          Array.isArray(data) &&
          data.every((item) => "category" in item && "amount" in item)
        ) {
          setTransactions(data);
          console.log("Categories data set:", data);
        } else {
          console.error("Invalid data format:", data);
          setCategories(null);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <h1>Spending Smartly Dashboard</h1>
        <div className={styles.balanceContainer}>
          <h2>Current Balance</h2>
          <p className={styles.balance}>${balance.toFixed(2)}</p>
        </div>
        <div className={styles.recentTrxContainer}>
          <h2>Recent Transactions</h2>

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
                  <td>${transaction.amount}</td>
                  <td>{transaction.transactiontype}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className={styles.heading}>
          <b>Expense Distribution</b>
        </h2>
        <div className={styles.chartContainer}>
          {categories && categories.length > 0 ? (
            <CustomPieChart data={categories} />
          ) : (
            <p>Loading chart data or no data available.</p>
          )}
        </div>
        <br></br>
        <h2 className={styles.heading}>
          <b>Income Distribution</b>
        </h2>
        <div className={styles.chartContainer}>
          {categoriesdep && categoriesdep.length > 0 ? (
            <CustomPieChart data={categoriesdep} />
          ) : (
            <p>Loading chart data or no data available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
