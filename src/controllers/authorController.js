const authorModel = require('../models/authorModel')
const bookAuthModel = require('../models/bookAuthmodel')

const createAuthor = async function(req, res) {
    let save = req.body
    let store = await authorModel.create(save)
    res.send({ msg: store })
}
const createBookAuth = async function(req, res) {
    let data = req.body
    let save = await bookAuthModel.create(data)
    res.send({ msg: save })
}
const allbooKs = async function(req, res) {
    let authorDetails = await authorModel.find({ author_name: "Chetan Bhagat" });
    let id = authorDetails[0].author_id;
    let bookDetails = await bookAuthModel.find({ author_id: id })
    res.send({ msg: bookDetails })
}
const updateBooks = async function(req, res) {
    let update = req.body
    let UpdateByone = await bookAuthModel.findOneAndUpdate({ Name: "Two states" }, { $set: update }, { new: true })
    res.send({ data: UpdateByone })
}
const PriceBook = async function(req, res) {
    let between = await bookAuthModel.find({ price: { $gte: 50, $lte: 100 } })
        // let IDs = between[0].author_id;
        // let bookDetail = await bookAuthModel.find({ author_id: IDs })

    res.send({ data: between })
}
module.exports.createAuthor = createAuthor
module.exports.createBookAuth = createBookAuth
module.exports.allbooKs = allbooKs
module.exports.updateBooks = updateBooks
module.exports.PriceBook = PriceBook