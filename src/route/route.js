const express = require('express');
const router = express.Router();
const UrlController= require("../Controllers/urlController");

router.post("/url/shorten",UrlController.urlCreate)
router.get("/:urlCode",UrlController.getUrl)

router.all('/**', (req,res) => {
   return res.status(404).send({status: false, message: 'No URL found'});
})

module.exports = router;
