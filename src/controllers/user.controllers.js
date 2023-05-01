const userService = require("../service/user.service");

exports.index = async (req, res) => {
    try {
        let users = await userService.getAll();
        return res.render("users/index.ejs", { users });
    }
    catch(error) {
        return res.send("Une erreur est survenue: ", error);
    }
}

exports.getAdd = async (req, res) => {
    try {
        return res.render("users/add");
    }
    catch(error) {
        return res.status(500).json({
            type: "error",
            message: error
        });
    }
}

exports.getById = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await userService.getById(id);
    
        return res.render("users/details.ejs", { user });
    }
    catch(error) {
        return res.send("Une erreur est survenue: ", error);
    }
}

exports.create = async (req, res) => {
    try {
        let user = await userService.getByEmail(req.body.email);
        if(user) {
            console.log("Un utilisateur existe déjà avec cette adresse mail");
        }
        else {
            user = await userService.create(req.body);
            if(!user) {
                console.log("Utilisateur non créé");
            }
            else {
                console.log("Utilisateur créé avec succès !");
                res.redirect("/users");
            }
        }
    }
    catch(error) {
        console.log(error);
    }
}

exports.api_getAll = async(req, res) => {
    try {
        let users = await userService.getAll();
        return res.status(200).json({
            type: "success",
            message: "Liste des utilisateurs réussie",
            users
        });
    }
    catch(error) {
        return res.status(500).json({
            type: "error",
            message: error
        });
    }
}

exports.api_getById = async(req, res) => {
    try {
        let user = await userService.getById(req.params.id);
        return res.status(200).json({
            type: "success",
            message: "Utilisateur réussi",
            user
        });
    }
    catch(error) {
        return res.status(500).json({
            type: "error",
            message: error
        });
    }
}