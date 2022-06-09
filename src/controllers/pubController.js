const PublisherModel = require('../models/pubLisher')


const createPublisher = async function(req, res) {
    let pub = req.body
    let publisHer = await PublisherModel.create(pub)
    res.send({ data: publisHer })
}
module.exports.createPublisher = createPublisher