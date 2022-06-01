let ChangeTrim = function() {
    console.log('The result after triming the string :' + '    FunctionUp'.trim());
}
let changetoLowerCase = function() {
    let test = 'FUNCTIONUP';
    let result = test.toLowerCase();
    console.log('Result after change to lower case :', result)
}
let changetoUpperCase = function() {
    let test = 'functionup';
    let result = test.toUpperCase();
    console.log('Result after change to upper case : ', result)
}
module.exports.ChangeTrim = ChangeTrim
module.exports.changetoLowerCase = changetoLowerCase
module.exports.changetoUpperCase = changetoUpperCase