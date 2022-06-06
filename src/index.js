const express = require('express');
var bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://BAravind:16mhvAqWnhmqivZs@cluster0.fq4pskd.mongodb.net/test", {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is started"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
app.get('/sol1', function(req, res) {
    let arr = [1, 2, 3, 5, 6, 7];
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }

    let n = arr[arr.length - 1]
    let miss = n * (n + 1) / 2
    let missingNumber = miss - sum;


    res.send({ data: missingNumber });
});
app.get("/sol2", function(req, res) {
    let arr = [33, 34, 35, 37, 38];
    let n = arr.length + 1,
        sum = 0;

    for (var i in arr) {
        sum += arr[i];
    }

    let firstDigit = arr[0]
    let lastDigit = arr.pop()
    let consecutiveSum = n * (firstDigit + lastDigit) / 2
    let missingNumber = consecutiveSum - sum

    res.send({ data: missingNumber });
});