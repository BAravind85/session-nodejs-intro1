const express = require('express');
const welcomeModule = require('../logger/logger')
const helperModule = require('../utill/helper')
const formatterModule = require('../validator/formatter')

const router = express.Router();

router.get('/test-me', function(req, res) {
    res.send('My first ever api!')
    welcomeModule.welcomeMessage()
    helperModule.printDate()
    helperModule.printMonth()
    helperModule.getBatchInfo()
    formatterModule.ChangeTrim()
    formatterModule.changetoLowerCase()
    formatterModule.changetoUpperCase()
});



module.exports = router;
// adding this comment for no reason