const Parser = require("../src/Parser");

describe("Should parse infix notation", function () {

    notations = [
        " True and false or true but !N ",
        "True And false Or true But !N    ",
        "True AND false OR true BUT not N",
        "True + false OR true -N", 
        "True + false || true -N", 
        "Yes && false || true !N", 
        "Y && false || true !N", 
        "True And false Or true But (!N)    ",
        "True And false Or true But (! N )    ",
    ];
    
    const parser = new Parser();
    notations.forEach(function (notation){
        it(notation, function(){
            //console.log(parser._exp)
            expect(parser.evaluate(notation)).toBeTruthy();
        })
    })

});
describe("Should throw error for invalid expressions", function () {

    notations = [
        " True and false or ",
        "True And Or true But !N    ",
        "True AND (false OR) true BUT not N",
        "+ false || true -N", 
        "&& false || true !N", 
    ];
    
    const parser = new Parser();
    notations.forEach(function (notation){
        it(notation, function(){
            //console.log(parser._exp)

            expect(()=>{
                parser.evaluate(notation);
            }).toThrowError("Invalid Expression: " + notation);
        })
    })

});