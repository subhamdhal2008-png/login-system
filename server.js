const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/save", (req, res) => {

    let data = [];

    // safer JSON read (prevents crash if file is empty or corrupted)
    if (fs.existsSync("data.json")) {
        try {
            const fileData = fs.readFileSync("data.json", "utf8");
            data = fileData ? JSON.parse(fileData) : [];
        } catch (err) {
            data = [];
        }
    }

    data.push(req.body);

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    console.log("Data saved:", req.body);

    res.send("Data Saved!");
});

// Render port fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});