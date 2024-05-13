module.exports = forgotpass;
Path: Backend/index.js
//Compare this snippet from Backend/index.js;
const cors = require("cors");
const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();


app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    }),
);
app.use(cookieParser());


const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "clinic_db",
    });
};
app.post("/api/forgotpass", async (req, res) => {
    const { email } = req.body;

    const [rows] = await conn.query("SELECT * FROM users WHERE email = ?", email);
    if (!rows.length) {
        return res.status(400).send({ message: "Email is not registered" });
    }

    const token = jwt.sign({ email }, JTW_SECRET, { expiresIn: "1h" });

    res.send({ token });
});

app.post("/api/resetpass", async (req, res) => {
    const { token, password } = req.body;

    try {
        const { email } = jwt.verify(token, JTW_SECRET);
        const hash = await bcrypt.hash(password, 10);

        await conn.query("UPDATE users SET password = ? WHERE email = ?", [hash, email]);

        res.send({ message: "Password has been reset" });
    } catch (e) {
        res.status(400).send({ message: "Invalid token" });
    }
});

