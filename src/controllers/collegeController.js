const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

//==========================Regex======================================================
let nameRegex = /^[#.a-zA-Z\s,-]+$/
    //let linkRegex = /(https?:\/\/(?:www\.)?[\w+-_.0-9@\/]+logo.(?:png|jpg|jpeg))/


//==========================post college Api==============================================================

const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const createCollege = async function(req, res) {
        try {
            let data = req.body
            if (Object.keys(data).length === 0)
                return res.status(400).send({ status: false, message: "Please enter the name, fullName and logoLink." });
            const { name, fullName, logoLink } = data
            if (!isValid(name))
                return res.status(400).send({ status: false, message: "Please enter a valid college name. It should not be alphanumeric." })
            if (!data.name.match(nameRegex))
                return res.status(400).send({ status: false, message: "name should contain alphabets only." })

            if (!isValid(fullName))
                return res.status(400).send({ status: false, message: "Enter a valid fullName of the college. It should not be alphanumeric." })
            if (!data.fullName.match(nameRegex))
                return res.status(400).send({ status: false, message: "fullName cannot be alphanumeric." })

            if (!isValid(logoLink))
                return res.status(400).send({ status: false, message: "Please enter a valid logoLink." })
                    // if (!linkRegex.test(logoLink))
                    //     return res.status(400).send({ status: false, message: "Please enter a valid logoLink.1" })

            let college = await collegeModel.findOne({ name: data.name })
            if (college) return res.status(400).send({ status: false, message: "name should be unique." })

            let collegeCreated = await collegeModel.create(data)
            return res.status(201).send({
                status: true,
                msg: "College created successfully",
                data: collegeCreated
            })
        } catch (err) {
            console.log(err)
            return res.status(500).send({ status: false, message: err.message })
        }
    }
    //===================================get Api===================================================

const getDetails = async function(req, res) {
    let collegeName = req.query.collegeName
    let findCollege = await collegeModel.findOne({ name: collegeName })
    if (!findCollege) return res.status(400).send({ status: false, message: "No such college found" })
    const { name, fullName, logoLink } = findCollege
    let interns = await internModel.find({ collegeId: findCollege._id }).select({ name: 1, email: 1, mobile: 1 })
    if (interns.length === 0) return res.status(400).send({ status: false, message: "No intern(s) in this college" })
    let details = { name: name, fullName: fullName, logoLink: logoLink, interns: interns }
    return res.status(200).send({ status: true, data: details })
}

module.exports.createCollege = createCollege
module.exports.getDetails = getDetails