"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "../styles/Dashboard.module.css";
import CustomPieChart from "../../components/PieChart";

const Help: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className="container text-center">
        <h1 className={styles.title}>Help & Support</h1>
        <p className={styles.description}>
          Need assistance? Find answers to common questions below.
        </p>

        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card p-4 shadow-lg bg-dark text-white mb-4">
              <h3>How to Add a Transaction?</h3>
              <p>
                Click on <strong>"Add Transaction"</strong>, enter the details,
                and hit <strong>"Save Transaction"</strong>.
              </p>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card p-4 shadow-lg bg-dark text-white mb-4">
              <h3>How to Categorize Expenses?</h3>
              <p>
                Use the <strong>"New Category"</strong> option to create
                personalized expense categories.
              </p>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card p-4 shadow-lg bg-dark text-white mb-4">
              <h3>Where to See My Balance?</h3>
              <p>
                Your **Current Balance** is displayed at the top of the
                dashboard, updating in real-time.
              </p>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card p-4 shadow-lg bg-dark text-white mb-4">
              <h3>How to Edit Transactions?</h3>
              <p>
                Click on a transaction in the table to edit or delete it as
                needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
