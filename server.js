const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Set this in Azure App Service after you know the Static Web App URL.
// Example:
// ALLOWED_ORIGIN=https://your-static-site.azurestaticapps.net
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({
    origin: allowedOrigin
}));

app.use(express.json());

// Basic API information.
app.get("/", (req, res) => {
    res.json({
        application: "Dice Roller REST API",
        status: "online",
        endpoints: ["/wake", "/roll", "/cors-failure"]
    });
});

// Used by the static website to wake/test the Node.js server.
app.get("/wake", (req, res) => {
    res.json({
        status: "awake",
        message: "The Dice Roller Node.js server is awake."
    });
});

// The SERVER generates the random number.
app.get("/roll", (req, res) => {
    const roll = Math.floor(Math.random() * 6) + 1;

    res.json({
        roll: roll
    });
});

// This endpoint intentionally has no CORS header.
// Use it to demonstrate the required CORS failure.
app.get("/cors-failure", (req, res) => {
    res.removeHeader("Access-Control-Allow-Origin");

    res.json({
        message: "This endpoint intentionally demonstrates a CORS failure."
    });
});

app.listen(PORT, () => {
    console.log(`Dice Roller API listening on port ${PORT}`);
});