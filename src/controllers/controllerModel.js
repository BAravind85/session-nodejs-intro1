const BookModel = require('../models/UserModel');

const CreateBook = async function(req, res) {
    let data = req.body;
    let SaveData = await BookModel.create(data);
    res.send({ msg: SaveData })
}
const GetBookData = async function(req, res) {
    let allData = await BookModel.find();
    res.send({ msg: allData })

}

module.exports.CreateBook = CreateBook
module.exports.GetBookData = GetBookData