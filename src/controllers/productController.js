const productModel = require("../models/productModel")
const createProduct = async function(req, res) {
    let pro = req.body
    let SaveProduct = await productModel.create(pro)
    res.send({ data: SaveProduct })
}

module.exports.createProduct = createProduct