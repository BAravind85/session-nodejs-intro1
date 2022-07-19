const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const UrlController= require("../Controllers/urlController");

router.post("/url/shorten",UrlController.urlCreate)

module.exports = router
=======
const  { urlCreate,getUrl}= require("../Controllers/urlController");

router.post("/url/shorten",urlCreate)
router.get("/:urlCode",getUrl)

module.exports = router
>>>>>>> 79e063b41acb9c1bf0100fc135c81b769cbe97ba
