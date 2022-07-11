const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
    ////////////////////////////////////////////////////////
const nameRegex = /^[a-zA-Z\s]+$/
const emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
const validMobile = /^[1-9]\d{9}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/;
const isValidTitle = function(x) {
    return ["Mr", "Mrs", "Miss"].indexOf(x) !== -1;
};

const isValid = function(x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};
const isValidBody = function(x) {
    return Object.keys(x).length > 0;
};
/////////////////////////////////////////////////////////
const createUser = async function(req, res) {

    try {

        let data = req.body

        if (!isValidBody(data)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details ⚠️" });
        }
        const { title, name, phone, email, password, address } = data

        if (!isValidTitle(title)) // --> name should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the title name. ⚠️" })

        if (!isValid(name)) // --> name should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the user name. ⚠️" })
        if (!nameRegex.test(name)) // --> name should be provided in right format
            return res.status(400).send({ status: false, message: "name should contain alphabets only. ⚠️" })



        //-->Phone validate
        if (!isValid(phone)) // --> name should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the user mobile number. ⚠️" })
        if (!validMobile.test(phone)) // --> name should be provided in right format
            return res.status(400).send({ status: false, message: "number should contain numeric only. ⚠️" })



        //--> ! validate email
        if (!isValid(email)) // --> name should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the user mail id. ⚠️" })
        if (!emailRegex.test(email)) // --> name should be provided in right format
            return res.status(400).send({ status: false, message: "mail should be contain correct format only. ⚠️" })

        //-->validating password
        if (!isValid(password)) // --> name should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the user password. ⚠️" })
        if (!passwordRegex.test(password)) {
            return res.status(400).send({ status: false, message: "Your password must contain atleast one number,uppercase,lowercase and special character[ @ $ ! % * ? & # ] and length should be min of 8-15 charachaters ⚠️" })
        }



        //-->address validate
        if ("address" in data && !isValid(address)) return res.status(400).send({ status: false, message: "Please enter user address ⚠️" })



        // checking for unique email and phone
        let getBookDetails = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })
        if (getBookDetails) {

            if (getBookDetails.phone == phone) {
                return res.status(400).send({ status: false, msg: `${phone} email already registered ⚠️ ` })
            } else {
                return res.status(400).send({ status: false, msg: `${email} phone number already registered ⚠️` })
            }
        }


        let savedData = await userModel.create(data)
        return res.status(201).send({ status: true, message: 'Success', data: savedData })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })

    }
}


const loginUser = async function(req, res) {

    try {
        let body = req.body
        let user = await userModel.findOne(body);
        if (!user)
            return res.status(400).send({
                status: false,
                message: "Bad Request. username or the password is not correct ⚠️",
            });
        let token = jwt.sign({
                userId: user._id.toString()
            },
            "ASDFGH3456OKJNBDCFGHJ", { expiresIn: "60min" }

        );
        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, message: "Login Successful", data: { token: token } });
    } catch (err) {

        return res.status(500).send({ status: false, message: err.message })

    }
}

module.exports = { createUser, loginUser }