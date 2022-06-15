const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function(abcd, xyz) {

    let data = abcd.body;
    let savedData = await userModel.create(data);
    xyz.send({ msg: savedData });
};

const loginUser = async function(req, res) {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
        return res.send({
            status: false,
            msg: "username or the password is not correct",
        });

    // Once the login is successful, create the jwt token with sign function
    // Sign function has 2 inputs:
    // Input 1 is the payload or the object containing data to be set in token
    // The decision about what data to put in token depends on the business requirement
    // Input 2 is the secret
    // The same secret will be used to decode tokens
    let token = jwt.sign({
            userId: user._id.toString(),
            batch: "Radon",
            organisation: "FunctionUp",
        },
        "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, token: token });
};

const getUserData = async function(req, res) {

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
        return res.send({ status: false, msg: "No such user exists" });

    res.send({ status: true, data: userDetails });
};

const updateUser = async function(req, res) {
    // Do the same steps here:
    // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases

    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
        return res.send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.send({ status: true, data: updatedUser });
};
const deleteUser = async function(req, res) {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
        return res.send("No such user exists");
    }

    let userUpdate = await userModel.findByIdAndUpdate({ _id: userId }, { isDeleted: true }, { new: true })
    res.send({ status: true, data: userUpdate })
}
const postMessage = async function(req, res) {
        let message = req.body.message
        let user = await userModel.findById(req.params.userId)
        if (!user) res.send({ status: false, msg: "user id is incorrect" })
        let updating = user.posts
        updating.push(message)
            //let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updating }, { new: true })
        res.send({ data: user })
    }
    // const postMessage = async function(req, res) {
    //     let message = req.body.message
    //     let user = await userModel.findById(req.params.userId)

//     if (!user) return res.send({ status: false, msg: 'No such user exists' })
//     console.log(user)

//     let updatedPosts = user.posts
//         //add the message to user's posts
//     updatedPosts.push(message)
//     let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })

//     //return the updated user document
//     return res.send({ status: true, data: updatedUser })
// }

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser
module.exports.postMessage = postMessage