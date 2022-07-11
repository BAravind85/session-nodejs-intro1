const express = require("express"); // --> importing the express framework
const router = express.Router();
const bookController = require("../controllers/bookController")
const userController = require("../controllers/userController")
const reviewController = require("../controllers/reviewController")
const { authentication } = require("../middleware/auth")


/////--->> register and lOgin

router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)

//////--> Using authentication form here////////

router.post("/books", authentication, bookController.createBook)

router.get("/books", authentication, bookController.bookDetails)

router.get("/books/:bookId", authentication, bookController.getBookDetails)

router.put("/books/:bookId", authentication, bookController.updateBook)

router.delete("/books/:bookId", authentication, bookController.deleteBookById)

////////////-->review apis
router.post("/books/:bookId/review", reviewController.createReview)

router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId", reviewController.deletReview)


module.exports = router