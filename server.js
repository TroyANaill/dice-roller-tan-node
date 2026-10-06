const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

// Normal API routes use CORS.
app.use((req, res, next) => {
    if (req.path === "/cors-failure") {
        next();
        return;
    }

    cors({
        origin: allowedOrigin
    })(req, res, next);
});

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        application: "Dice Roller REST API",
        status: "online",
        endpoints: ["/wake", "/roll", "/cors-failure"]
    });
});

app.get("/wake", (req, res) => {
    res.json({
        status: "awake",
        message: "The Dice Roller Node.js server is awake."
    });
});

app.get("/roll", (req, res) => {
    const roll = Math.floor(Math.random() * 6) + 1;

    res.json({
        roll: roll
    });
});

// Intentionally has NO CORS permission.
app.get("/cors-failure", (req, res) => {
    res.json({
        message: "This endpoint intentionally demonstrates a CORS failure."
    });
});

app.listen(PORT, () => {
    console.log(`Dice Roller API listening on port ${PORT}`);
});