const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));


// SAVE DATA
app.post("/save", (req, res) => {

    const email = req.body.email;

    const password = req.body.password;

    let data = [];

    // CHECK IF FILE EXISTS
    if (fs.existsSync("data.json")) {

        let oldData = fs.readFileSync("data.json");

        data = JSON.parse(oldData || "[]");
    }

    // ADD NEW DATA
    data.push({
        email: email,
        password: password
    });

    // SAVE TO FILE
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.send("Data Saved!");

});


// SHOW SAVED DATA
app.get("/data", (req, res) => {

    if (fs.existsSync("data.json")) {

        let data = fs.readFileSync("data.json");

        res.send(data);

    } else {

        res.send("No data found");

    }

});


// PORT FOR RENDER
const PORT = process.env.PORT || 3000;


// START SERVER
app.listen(PORT, () => {

    console.log("Server running on port " + PORT);

});