const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// Your Azure Static Web App
const allowedOrigin =
    process.env.ALLOWED_ORIGIN ||
    "https://green-hill-03b303010.2.azurestaticapps.net";

// Normal API routes use CORS.
// The /cors-failure route intentionally does not.
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


// Home / API information
app.get("/", (req, res) => {

    res.json({
        application: "Dice Roller REST API",
        status: "online",
        endpoints: [
            "/wake",
            "/roll",
            "/cors-failure"
        ]
    });

});


// Wake up the server
app.get("/wake", (req, res) => {

    res.json({
        status: "awake",
        message: "The Dice Roller Node.js server is awake."
    });

});


// Generate a random number from 1 to 6
app.get("/roll", (req, res) => {

    const roll = Math.floor(Math.random() * 6) + 1;

    res.json({
        roll: roll
    });

});


// Endpoint intentionally used to demonstrate CORS failure
app.get("/cors-failure", (req, res) => {

    res.json({
        message: "This endpoint intentionally demonstrates a CORS failure."
    });

});


// Start server
app.listen(PORT, () => {

    console.log(
        `Dice Roller API listening on port ${PORT}`
    );

});