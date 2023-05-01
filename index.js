const express = require("express");
const app =  express();
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./src/models/user.model");

dotenv.config({path: "./.env"});
const userRoutes = require("./src/routes/user.route");


// connecting to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(async () => {
    console.log("Database connected successfully!");

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const exist = await User.findOne({ email: email });
    if (exist) {
      console.log("Default admin exist already.");
    } else {
      let admin = new User({
        name: "Admin",
        phone: "62145201200",
        email: email,
        post: "admin",
        address: "Ngaoundéré",
        gender: "Male"
      });
      User.register(admin, password, (err, admin) => {
        if (err) {
          console.log("Error creating default admin!!!\nERROR: ", err);
        }
        console.log("Default admin created successfully.");
      });
    }
  })
  .catch((err) => {
    console.log("Failed to connect to database!!!\nERR: " + err);
  });

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
app.get("*", (req, res) => {
    return res.send("<h1>Page not found</h1>");
});


app.listen(process.env.PORT, () => {
    console.log("Server started on port ", process.env.PORT);
});