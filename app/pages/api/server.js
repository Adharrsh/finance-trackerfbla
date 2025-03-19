const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const { FLOAT } = require("mysql/lib/protocol/constants/types");

const app = express();
const port = 3012;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adhi9adh",
  database: "finance_tracker",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.get("/api/recenttransactions", (req, res) => {
    const query = "SELECT * FROM transactions ORDER BY date DESC LIMIT 5";
    
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching recent transactions:", err);
        res.status(500).send("Error fetching category amounts");
        return;
      }
      console.log("Results for recent transaxtions:", results);
      res.status(200).json(results);
    });
  });

app.get("/api/categories-amounts", (req, res) => {
    const query = "SELECT category, SUM(amount) as amount FROM transactions where transactiontype = 'Withdrawal' GROUP BY category";
   
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching category amounts:", err);
        res.status(500).send("Error fetching category amounts");
        return;
      }
      console.log("Results from withdrawal:", results);
      res.status(200).json(results);
    });
  });

app.get("/api/categories-amounts-deposits", (req, res) => {
    const query = "SELECT category, SUM(amount) as amount FROM transactions where transactiontype = 'Deposit' GROUP BY category";
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching category amounts:", err);
        res.status(500).send("Error fetching category amounts");
        return;
      }
      console.log("Results from deposits:", results);
      res.status(200).json(results);
    });
  });

app.post("/api/getreport", (req, res) => {
    console.log("Request body:", JSON.stringify(req.body)); 
    const { startdate, enddate} = req.body;
    console.log("startdate:", startdate);
    console.log("enddate"+ enddate);
    const query = `SELECT * FROM transactions WHERE date BETWEEN '${startdate}' AND '${enddate}'`;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching category amounts:", err);
        res.status(500).send("Error fetching category amounts");
        return;
      }
      console.log("Results from getreport:", results);
      res.status(200).json(results);
    });
  });

  app.delete("/api/transactions/:id", (req, res) => {
    const { id } = req.params;
    console.log("Deleting transaction with ID:", id);
  
    const query = `DELETE FROM transactions WHERE id = ?`;
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error deleting transaction:", err);
        res.status(500).send("Error deleting transaction");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Transaction not found");
        return;
      }
      console.log("Transaction deleted:", results);
      res.status(200).send("Transaction deleted");
    });
  });

app.post("/api/transactions", (req, res) => {
  console.log("Request body:", JSON.stringify(req.body)); 
  const { amount, category, date, type } = req.body;
  console.log("Amount:", amount);
  console.log("poopy"+req.body);
  const query = "INSERT INTO transactions (amount, category, date, transactiontype) VALUES (?, ?, ?, ?)";
  db.query(query, [amount, category, date, type], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
      return;
    }
    res.status(200).send("Transaction saved successfully");
  });
});

app.get("/api/categories", (req, res) => {
    const query = "SELECT * FROM Categories";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching categories:", err);
        res.status(500).send("Error fetching categories");
        return;
      }
      res.status(200).json(results);
    });
  });

app.post("/api/categories", (req, res) => {
    console.log("Request body:", JSON.stringify(req.body).replace("newCategory","category")); 
    const modifiedBodyString = JSON.stringify(req.body).replace("newCategory", "category");
    const modifiedBody = JSON.parse(modifiedBodyString);
    const { category } = modifiedBody;
    const query = "INSERT INTO Categories (category) VALUES (?)";
    db.query(query, [category], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }
      res.status(200).send("Category saved successfully");
    });
  });

  app.get("/api/balance", (req, res) => {
    const query = "SELECT amount, transactiontype FROM transactions";
    console.log("inside api/balance");
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).send("Error fetching transactions");
        return;
      }
  
      // Calculate the total balance
      console.log("peepee");
      let totalBalance = 0;
      results.forEach((row) => {
        const amount = parseFloat(row.amount); 
        console.log("poop");
        if (row.transactiontype === "Deposit") {
          totalBalance += amount;
          console.log("peep" + totalBalance);
        } else if (row.transactiontype === "Withdrawal") {
          totalBalance -= amount;
          console.log("pop" + totalBalance);
        }
      });
        console.log("poopoo" + totalBalance);
      res.status(200).json({ balance: totalBalance });
    });
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 

