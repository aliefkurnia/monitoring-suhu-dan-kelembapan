const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Menggunakan bodyParser dari Express

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "monitoring",
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

// Route for fetching all data from monitoring table
app.get("/monitoring", (req, res) => {
  const sql = "SELECT * FROM monitoring";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    return res.json(data);
  });
});

// Route for inserting data into the monitoring table via GET request
app.get("/insert", (req, res) => {
  const { suhu, kelembapan, motor_kipas, motor_humidifier } = req.query;

  if (!suhu || !kelembapan) {
    return res.status(400).json({
      success: false,
      message: "suhu and kelembapan are required",
    });
  }

  const sql =
    "INSERT INTO monitoring (suhu, kelembapan, motor_kipas, motor_humidifier) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [suhu, kelembapan, motor_kipas, motor_humidifier],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to insert data" });
      }

      console.log("Data inserted successfully");
      return res.json({
        success: true,
        message: "Data inserted successfully",
        data: {
          id: results.insertId,
          suhu,
          kelembapan,
          motor_kipas,
          motor_humidifier,
        },
      });
    }
  );
});

// Route untuk menyetel mode
app.get("/set-mode", async (req, res) => {
  const { mode } = req.query;

  const validModes = ["OFF", "ON", "AUTOMATIC"];
  if (!validModes.includes(mode)) {
    return res.status(400).json({
      success: false,
      message: "Invalid mode. Allowed values are OFF, ON, AUTOMATIC.",
    });
  }

  // Update mode in the database
  const sql = "UPDATE controling SET mode = ? WHERE id = 1";
  db.query(sql, [mode], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.json({
      success: true,
      message: "Mode set successfully",
    });
  });
});

// Route for getting the current mode
app.get("/get-mode", (req, res) => {
  const sql = "SELECT mode FROM controling WHERE id = 1";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No mode found" });
    }
    res.json({
      success: true,
      mode: results[0].mode,
    });
  });
});

// Route for login
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

// Route for registration
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
  console.log("Listening on port 8801");
});
