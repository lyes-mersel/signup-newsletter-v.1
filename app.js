const express = require("express");
const bodyParser = require("body-parser");
const mail = require(__dirname + "/mail.js")

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mail.connect();

app.get("/", (req, res) => {
    res.render("signup");
})

app.post("/", (req, res) => {
    mail.addUserToMailList(
        req.body.inputFirstName,
        req.body.inputLastName,
        req.body.inputEmail
    ).then(() => {
        res.render("success");
    }).catch((error) => {
        res.render("failure", {error: error});
    })
})

app.post("/failure",( req, res) => {
    res.redirect("/");
})

app.listen(port, () => {
    console.log("The server is running on port " + port);
});
