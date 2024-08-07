const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/", (req, res) => {
  return res.json("from backend");
});

app.get("/monitoring", (req, res) => {
  const sql = "SELECT * FROM monitoring";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", { username, password });

  const sql = "SELECT * FROM login WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    if (results.length === 0) {
      console.log("User not found");
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const user = results[0];
    if (password === user.password) {
      // Direct comparison
      console.log("Login successful");
      return res.json({
        success: true,
        user: { id: user.id, username: user.username },
      });
    } else {
      console.log("Password mismatch");
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  });
});

// Route untuk pendaftaran
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log("Registration attempt:", { username });

  const sql = "INSERT INTO login (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    console.log("User registered successfully");
    return res.json({
      success: true,
      message: "User registered successfully",
    });
  });
});

app.listen(8801, () => {
  console.log("listening on port 8801");
});
