const orderModel = require("../models/OrderModel")
const productModel = require("../models/productModel")
const uSerModel = require("../models/UsersModel")

const createOrder = async function(req, res) {
    let orderdata = req.body
    let header = req.headers
    let typeOfUser = header['isfreeappuser']

    let UserId = orderdata.userId
    let uSeriD = await uSerModel.findById(UserId)
    if (!uSeriD) {
        res.send({ status: false, MSG: " ! User id is invalid" })
    }
    let ProductId = orderdata.productId
    let IdProduct = await productModel.findById(ProductId)
    if (!IdProduct) {
        res.send({ status: false, MSG: " ! Product id is invalid" })
    }
    let paidUser = false
    if (typeOfUser == 'false') {
        paidUser = true
    }

    if (paidUser && uSeriD.Balance >= IdProduct.price) {
        uSeriD.Balance = uSeriD.Balance - IdProduct.price
        await uSeriD.save()

        orderdata.amount = IdProduct.price
        orderdata.isFreeAppUser = false
        let orderData = await orderModel.create(orderdata)
        res.send({ data: orderData })
    } else
    if (paidUser) {
        res.send({ status: false, message: "User doesn't have sufficient balance" })
    } else {
        orderdata.amount = 0
        orderdata.isFreeAppUser = true
        let orderData = await orderModel.create(orderdata)
        res.send({ data: orderData })
    }
}
module.exports.createOrder = createOrder