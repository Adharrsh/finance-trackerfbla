const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});