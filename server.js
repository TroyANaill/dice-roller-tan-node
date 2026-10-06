const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigin =
    process.env.ALLOWED_ORIGIN ||
    "https://green-hill-03b303010.2.azurestaticapps.net";


// CORS configuration
app.use((req, res, next) => {

    // This endpoint intentionally has no CORS headers.
    if (req.path === "/cors-failure") {
        next();
        return;
    }

    cors({
        origin: allowedOrigin
    })(req, res, next);
});

app.use(express.json());


// ---------------------------------------------
// MAIN INDEX PAGE
// ---------------------------------------------

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "index.html"));

});


// ---------------------------------------------
// API INFORMATION
// ---------------------------------------------

app.get("/api", (req, res) => {

    res.json({
        application: "Dice Roller REST API",
        status: "online",
        endpoints: [
            "/wake",
            "/roll",
            "/roll/d4",
            "/roll/d6",
            "/roll/d8",
            "/roll/d10",
            "/roll/d12",
            "/roll/d20",
            "/roll/d100",
            "/cors-failure"
        ]
    });

});


// ---------------------------------------------
// WAKE UP SERVER
// ---------------------------------------------

app.get("/wake", (req, res) => {

    res.json({
        status: "awake",
        message: "The Dice Roller Node.js server is awake."
    });

});


// ---------------------------------------------
// RANDOM NUMBER FUNCTION
// ---------------------------------------------

function rollDie(sides) {

    return Math.floor(Math.random() * sides) + 1;

}


// ---------------------------------------------
// DICE API ROUTES
// ---------------------------------------------

app.get("/roll", (req, res) => {

    res.json({
        sides: 6,
        roll: rollDie(6)
    });

});


app.get("/roll/d4", (req, res) => {

    res.json({
        sides: 4,
        roll: rollDie(4)
    });

});


app.get("/roll/d6", (req, res) => {

    res.json({
        sides: 6,
        roll: rollDie(6)
    });

});


app.get("/roll/d8", (req, res) => {

    res.json({
        sides: 8,
        roll: rollDie(8)
    });

});


app.get("/roll/d10", (req, res) => {

    res.json({
        sides: 10,
        roll: rollDie(10)
    });

});


app.get("/roll/d12", (req, res) => {

    res.json({
        sides: 12,
        roll: rollDie(12)
    });

});


app.get("/roll/d20", (req, res) => {

    res.json({
        sides: 20,
        roll: rollDie(20)
    });

});


app.get("/roll/d100", (req, res) => {

    res.json({
        sides: 100,
        roll: rollDie(100)
    });

});


// ---------------------------------------------
// CORS FAILURE TEST
// ---------------------------------------------

app.get("/cors-failure", (req, res) => {

    res.json({
        message: "This endpoint intentionally demonstrates a CORS failure."
    });

});


// ---------------------------------------------
// START SERVER
// ---------------------------------------------

app.listen(PORT, () => {

    console.log(
        `Dice Roller API listening on port ${PORT}`
    );

});
