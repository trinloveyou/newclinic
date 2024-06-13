const cors = require("cors");
const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
//const app = express();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

const port = 8000;
const secret = "mysecret";

let conn = null;

// function init connection mysql
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "clinic_db",
  });
};

app.post("/api/register", async (req, res) => {
  const { name, numphone, email, password } = req.body;

  const [rows] = await conn.query("SELECT * FROM users WHERE email = ?", email);
  if (rows.length) {
    return res.status(400).send({ message: "Email is already registered" });
  }

  // Hash the password
  const hash = await bcrypt.hash(password, 10);

  const userData = {
    name,
    numphone,
    email,
    password: hash,
    role: 1,
  };

  try {
    const result = await conn.query("INSERT INTO users SET ?", userData);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "insert fail",
      error,
    });
  }

  res.status(201).send({ message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await conn.query(
      "SELECT * from users WHERE email = ?",
      email
    );

    if (result.length === 0) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // สร้าง token jwt
    const token = jwt.sign({ email, role: "admin" }, secret, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    let authToken = "";
    if (authHeader) {
      authToken = authHeader.split(" ")[1];
    }
    console.log("authToken", authToken);
    const user = jwt.verify(authToken, secret);

    const [checkResults] = await conn.query(
      "SELECT * FROM users where email = ?",
      user.email
    );

    if (!checkResults[0]) {
      throw { message: "user not found" };
    }

    const [results] = await conn.query("SELECT * FROM users");
    res.json({
      users: results,
    });
  } catch (error) {
    console.log("error", error);
    res.status(403).json({
      message: "Authention fail",
      error,
    });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const [results] = await conn.query("SELECT * FROM users WHERE id = ?", id);
  res.json({ user: results[0] });
});

// Listen
app.listen(port, async () => {
  await initMySQL();
  console.log("Server started at port 8000");
});

// make api to get data from database
app.get("/api/users", async (req, res) => {
  const [results] = await conn.query("SELECT * FROM users");
  res.json({ clinic: results });
});

// get only user that login with token
app.get("/api/usertoken", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    let authToken = "";
    if (authHeader) {
      authToken = authHeader.split(" ")[1];
    }
    console.log("authToken", authToken);
    const user = jwt.verify(authToken, secret);

    const [checkResults] = await conn.query(
      "SELECT * FROM users where email = ?",
      user.email
    );

    if (!checkResults[0]) {
      throw { message: "user not found" };
    }

    const [results] = await conn.query(
      "SELECT name , numphone , email , role FROM users where email = ?",
      user.email
    );
    res.json({
      users: results,
    });
  } catch (error) {
    console.log("error", error);
    res.status(403).json({
      message: "Authention fail",
      error,
    });
  }
});

// edit profile
app.put("/api/editprofile", async (req, res) => {
  const { name, email, numphone } = req.body;
  try {
    const authHeader = req.headers["authorization"];
    let authToken = "";
    if (authHeader) {
      authToken = authHeader.split(" ")[1];
    }
    console.log("authToken", authToken);
    const user = jwt.verify(authToken, secret);

    const [checkResults] = await conn.query(
      "SELECT * FROM users where email = ?",
      user.email
    );

    if (!checkResults[0]) {
      throw { message: "user not found" };
    }

    const [results] = await conn.query(
      "UPDATE users SET name = ? , email = ? , numphone = ? WHERE email = ?",
      [name, email, numphone, user.email]
    );
    res.json({
      message: "edit profile success",
    });
  } catch (error) {
    console.log("error", error);
    res.status(403).json({
      message: "Authention fail",
      error,
    });
  }
});
