const express = require("express");
const app =  express();
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const dotenv = require("dotenv");

dotenv.config({path: "./.env"});
const userRoutes = require("./src/routes/user.route");


app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    // res.locals.success_msg = req.flash(("success_msg"));
    // res.locals.error_msg = req.flash(("error_msg"));
    next();
})

app.use(userRoutes);


app.listen(process.env.PORT, () => {
    console.log("Server started on port ", process.env.PORT);
});