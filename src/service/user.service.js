const User = require("../models/user.model");


exports.getByEmail = async(email) => {
    return User.findOne({email: email});
}

exports.create = async (body) => {
    let password = body.password;
    delete body.password;

    return User.register(body, password);
}

exports.getAll = async() => {
    return User.find();
}

exports.getById = async(id) => {
    return User.findById(id);
}