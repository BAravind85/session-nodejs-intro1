const express = require('express');
const router = express.Router();
const UrlController= require("../Controllers/urlController");

router.post("/url/shorten",UrlController.urlCreate)

module.exports = router
