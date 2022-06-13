const UserModel = require("../models/UsersModel")
const createUsers = async function(req, res) {
    let use = req.body
    let saveUse = await UserModel.create(use)
    res.send({ data: saveUse })
}
module.exports.createUsers = createUsers