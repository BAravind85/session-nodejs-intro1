const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
const bookModel = require('../models/UserModel')
const controllerModel = require('../controllers/controllerModel')

const router = express.Router();
router.post('/createBook', controllerModel.CreateBook)
router.get('/GetBookData', controllerModel.GetBookData)


router.get('/test-me', function(req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha', 'Akash', 'Pritesh'])
    console.log('The first element received from underscope function is ' + firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function(req, res) {

    res.send('Hello there!')
});

router.get('/candidates', function(req, res) {
    console.log('Query paramters for this request are ' + JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is ' + state)
    console.log('Gender is ' + gender)
    console.log('District is ' + district)
    let candidates = ['Akash', 'Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res) {
    console.log('The request objects is ' + JSON.stringify(req.params))
    console.log('Candidates name is ' + req.params.canidatesName)
    res.send('Done')
})



let moVie = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
router.get('/movies', function(req, res) {
    res.send(moVie)
});
router.get('/movies/:number', function(req, res) {
    let number = req.params.number
    if (number < moVie.length) {

        res.send(moVie[number])
    } else {
        res.send('No movie exist with that index number')
    }


});
const films = [{
        'id': 1,
        'name': 'The Shining'
    },
    {
        'id': 2,
        'name': 'Incendies'
    },
    {
        'id': 3,
        'name': 'Rang de Basanti'
    },
    {
        'id': 4,
        'name': 'Finding Nemo'

    }
]
router.get('/films', function(req, res) {
    res.send(films)
});
router.get('/films/:filmsid', function(req, res) {
    let id = req.params.filmsid
    if (id < films.length && id > 0) {
        res.send(films[id - 1]);
    } else {
        res.send('Id doesnt exist in films list')
    }

});


let players = [{
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": [
            "swimming"
        ]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
            "soccer"
        ],
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ],
    },
]

router.post('/players', function(req, res) {
    let newPlayer = req.body
    let newPlayersName = newPlayer.name
    let isNameRepeated = false

    //let player = players.find(p => p.name == newPlayersName)

    for (let i = 0; i < players.length; i++) {
        if (players[i].name == newPlayersName) {
            isNameRepeated = true;
            break;
        }
    }

    //undefined is same as false/ a falsy value
    if (isNameRepeated) {
        //Player exists
        res.send("This player was already added!")
    } else {
        //New entry
        players.push(newPlayer)
        res.send(players)
    }


    //LOGIC WILL COME HERE
    //res.send({ data: players, status: true })
})

module.exports = router;



module.exports = router;
// adding this comment for no reason