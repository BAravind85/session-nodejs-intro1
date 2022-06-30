const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


let nameRegex = /^[#.a-zA-Z\s,-]+$/
let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
let numberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/


const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const createIntern = async function(req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0)
            return res.status(400).send({ status: false, message: "Please enter the name, email, mobile and collegeId." });

        const { name, email, mobile, collegeName, isDeleted } = data
        if (!isDeleted) {
            data.isDeleted = false;
        }
        if (!isValid(name))
            return res.status(400).send({ status: false, message: "Please enter the valid intern name." })
        if (!nameRegex.test(name)) return res.status(400).send({ status: false, message: "name should contain alphabets only." })

        if (!isValid(email))
            return res.status(400).send({ status: false, message: "Please enter a valid email." })
        if (!emailRegex.test(email)) return res.status(400).send({ status: false, message: "Please enter the emailId in a proper way" })

        if (!isValid(mobile))
            return res.status(400).send({ status: false, message: "Please enter valid mobile number." })
        if (!numberRegex.test(mobile)) return res.status(400).send({ status: false, message: "Enter mobile number in a valid format." })

        if (!isValid(collegeName))
            return res.status(400).send({ status: false, message: "Please enter valid college name." })
        if (!nameRegex.test(collegeName)) return res.status(400).send({ status: false, message: "name should contain alphabets only." })


        let getEmail = await internModel.findOne({ email });
        if (getEmail) {
            return res.status(400).send({ status: false, msg: "Email is already present.Enter a new email", });
        }
        let getMobile = await internModel.findOne({ mobile });
        if (getMobile) {
            return res.status(400).send({ status: false, msg: "Mobile no. is already present.Enter a new mobile no.", });
        }

        let findCollege = await collegeModel.findOne({ name: data.collegeName })
        if (!findCollege) return res.status(400).send({ status: false, message: "No such a college found" })
        data.collegeId = findCollege["_id"]


        let internCreated = await internModel.create(data)
        return res.status(201).send({
            status: true,
            msg: "intern created successfully",
            data: internCreated
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createIntern = createIntern