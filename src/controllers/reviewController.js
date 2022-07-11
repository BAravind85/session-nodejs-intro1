const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel");
const { bookDetails } = require("./bookController");

const createReview = async function(req, res) {
    try {
        let _id = req.params.bookId
        let data = req.body;
        let book = await bookModel.findOne({ $and: [{ _id }, { isDeleted: false }] })
        if (!book) return res.status(404).send({ status: false, message: "There is no book with that id ⚠️" })
        const { rating } = data;

        let arr = Object.keys(data);

        //if empty request body
        if (arr.length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide input ⚠️" });
        }

        //mandatory fields

        if (!rating) {
            return res
                .status(400)
                .send({ status: false, message: "rating is required ⚠️" });
        }

        //rating validation
        const validRating = /^([1-5]|1[5])$/.test(rating);
        if (!validRating) {
            return res.status(400).send({
                status: false,
                message: "Invalid rating - rating should be a Number between 1 to 5 ⚠️",
            });
        }

        //assign bookId from path
        data.bookId = _id;
        //create review
        const review = await reviewModel.create(data);
        const updatedBook = await bookModel
            .findByIdAndUpdate({ _id }, { $inc: { reviews: 1 } }, { new: true })
            .lean(); //unfreeze doc.



        updatedBook.reviewsData = review;


        res.status(200).send({ status: true, message: "success", data: updatedBook })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
const updateReview = async function(req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        let data = req.body
        let book = await bookModel.findById(bookId)
        if (book) {
            if (book['isDeleted'] == true) return res.status(404).send({ status: false, message: "The book has been deleted ⚠️" })
        } else return res.status(404).send({ status: false, message: "Book not found ⚠️" });
        let review = await reviewModel.findById(reviewId)
        if (review) {
            if (review['isDeleted'] == true) return res.status(404).send({ status: false, message: "Review has been deleted ⚠️" })
        } else return res.status(404).send({ status: false, message: "Review not found ⚠️" })
        let update = await reviewModel.findOneAndUpdate({ _id: review }, { $set: data }, { new: true })
        let result = book.toObject()
        result.reviews = update
        return res.status(200).send({ status: true, message: "Review updated successfully ✅ ", data: result })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const deletReview = async function(req, res) {

    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId


        if (!ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Bad Request. BookId invalid ⚠️" })
        }
        if (!ObjectId.isValid(reviewId)) {
            return res.status(400).send({ status: false, message: "Bad Request. Review invalid ⚠️" })
        }



        let checkReviewId = await reviewModel.findOneAndUpdate({ _id: reviewId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })

        if (!checkReviewId) return res.status(404).send({ status: false, message: "Data not found with this reviewId ⚠️" })

        let checkbookId = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: { $inc: { reviews: -1 } } }, { new: true })

        if (!checkbookId) return res.status(404).send({ status: false, message: "Data not found with this bookId ⚠️" })


        return res.status(200).send({ status: true, message: "Success ✅" })

    } catch (error) {

        return res.status(500).send({ status: false, message: "Server error" })

    }

}



module.exports = { createReview, updateReview, deletReview }