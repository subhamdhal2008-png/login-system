const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.use(express.static(__dirname));

app.post("/save", (req,res)=>{

    const email = req.body.email;

    const password = req.body.password;

    let data = [];

    if(fs.existsSync("data.json")){

        let oldData = fs.readFileSync("data.json");

        data = JSON.parse(oldData || "[]");
    }

    data.push({
        email: email,
        password: password
    });

    fs.writeFileSync("data.json", JSON.stringify(data,null,2));

    res.send("Data Saved!");

});

app.listen(3000, ()=>{

    console.log("Server running at http://localhost:3000");

});