const { userData } = require("../service/user.service");

exports.index = (req, res) => {
    return res.render("users/index.ejs", { users: userData });
}

exports.getById = (req, res) => {
    const id = req.params.id;
    let user = userData.filter(x => x.id.toString() == id);
    user = user[0];

    return res.render("users/details", { user });
}

exports.pageNotFound = (req, res) => {
    return res.send("<h1>Page not found</h1>");
}