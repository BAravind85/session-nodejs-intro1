const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const PublisherModel = require("../models/pubLisher");

const createBook = async function(req, res) {
    //validate author

    let book = req.body;

    let authorId = req.body.author_id;

    let publisherId = req.body.publisher_id;

    if (!authorId) {
        res.send({ Error: "Please enter Author ID" });
    }

    const authorInfo = await authorModel.findById(authorId);

    if (!authorInfo) {
        res.send({ Error: "Please enter a valid Author ID" });
    }

    //validate publisher

    if (!publisherId) {
        res.send({ Error: "Please Enter Publisher ID" });
    }

    const publisherInfo = await PublisherModel.findById(publisherId);

    if (!publisherInfo) {
        res.send({ Error: "Please enter a valid Publisher ID" });
    }

    let bookCreated = await bookModel.create(book);

    res.send({ data: bookCreated });
};

const getBooksData = async function(req, res) {
    let books = await bookModel.find();
    res.send({ data: books });
};

const getBooksWithAuthorDetails = async function(req, res) {
    let specificBook = await bookModel.find().populate("author_id");
    res.send({ data: specificBook });
};
const fetchBook = async function(req, res) {
    let fetch = await bookModel.find().populate('author_id publisher_id')
    res.send({ data: fetch })
}
const UpdateBookData = async function(req, res) {
    let uPdate = await PublisherModel.find({ name: { $in: ['Penguin', 'HarperCollins'] } })
    let publisherId = uPdate.map((x) => x._id)
    let UpdatingHard = await bookModel.updateMany({ publisher_id: { $in: publisherId } }, { isHardCover: true })
    res.send({ data: UpdatingHard })
}
const UpdateBookPrice = async function(req, res) {
    let authRating = await authorModel.find({ rating: { $gt: 3.5 } }).select('id')
    let upaTingPrice = await bookModel.updateMany({ author_id: authRating }, { price: { $inc: 10 } }, { new: true })
    res.send({ data: upaTingPrice })
}

module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
module.exports.fetchBook = fetchBook;
module.exports.UpdateBookData = UpdateBookData
module.exports.UpdateBookPrice = UpdateBookPrice