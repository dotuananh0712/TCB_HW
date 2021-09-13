// server.js
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const PORT = 4000;

const cors = require("cors");

const myRoutes = require("./route");

app.use(cors());
app.use(bodyParser.json());

app.post("/first", myRoutes);
app.post("/second", myRoutes);

// app.use(
// rateLimit({
//     windowMs: 60 * 60 * 1000, // 1 hour duration in milliseconds
//     max: 200,
//     message: "Slow Down !",
//     headers: true,
// })
// );

app.listen(PORT, () => {
    console.log('Your REST API with two POST endpoints is running on port ' + PORT)
})
