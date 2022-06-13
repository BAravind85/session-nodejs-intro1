const middleWare = async function(req, res, next) {
    let headers = req.headers
    let orderType = headers['isFreeAppUser']
    if (!orderType) {
        let header = headers['isfreeappuser']

        if (!header) {
            res.send({ status: false, error: 'Header is mandatory it is missing' })
        }
    }
    next()
}
module.exports.middleWare = middleWare