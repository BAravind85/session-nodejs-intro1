const jwt = require("jsonwebtoken");
const getHeader = function(req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
    console.log(token);
    let decodedToken = jwt.verify(token, "functionup-radon");
    console.log(decodedToken)
    if (!decodedToken)
        return res.send({ status: false, msg: "token is invalid" });
    next()
}

const authorisation = function(req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon")
    console.log(decodedToken)
    if (!decodedToken) res.send({ status: false, msg: "You have entered incorrect token" })
    let userModified = req.params.userId
    let userLoggedIn = decodedToken.userId
    if (userModified != userLoggedIn) res.send({ status: false, msg: "User logged is not allowed to modify the requested users data " })
    next()
}

module.exports = { getHeader, authorisation }