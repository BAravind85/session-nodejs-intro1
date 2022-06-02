const express = require('express');
const welcomeModule = require('../logger/logger')
const helperModule = require('../utill/helper')
const formatterModule = require('../validator/formatter')
const lodash = require('lodash')

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
router.get('/Hello', function(req, res) {
    res.send('Hello !')
        //Problem(1)
    let Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let Subarray = lodash.chunk(Month, 3);
    console.log('Here in months of year sized in 4 sub-array is :', Subarray)
        //problem(2)
    let oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    let lastNineodd = lodash.tail(oddNumbers)
    console.log('Getting last 9 odd number from above array :', lastNineodd)
        //Problem(3)
    let a = [1, 2, 1, 4]
    let b = [2, 3, 4, 3]
    let c = [6, 1, 5, 10]
    let d = [1, 1, 1]
    let e = [1, 2, 3, 4, 5]
    let Union = lodash.union(a, b, c, d, e);
    console.log('Here We getting without duplicate value from above arrays :', Union)
        //Problem(4)
    let valuePairs = [
        ['horror', 'The Shining'],
        ['drama', 'Titanic'],
        ['thriller', 'ShutterIsland'],
        ['fantasy', 'Pans Labyrinth']
    ]
    console.log('Here we get pairs from above array : ', lodash.fromPairs(valuePairs));

});




module.exports = router;
// adding this comment for no reason