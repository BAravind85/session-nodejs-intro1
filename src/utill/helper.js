const { get } = require("express/lib/response");

let printDate = function() {
    let CurrentDate = new Date()
    console.log('current Date is : ', CurrentDate);
}
let printMonth = function() {
    let CurrentMonth = new Date()
    console.log('current month is : ', CurrentMonth.getMonth() + 1);
}
let getBatchInfo = function() {
    console.log('Radon, Week3 day3, the topic for today is Nodejs module discussion');
}
module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo