const Parser = require("../src/Parser");

describe("Should throw error for invalid expressions", function () {

    notations = [
        "a and b or c but !d and",
        "a And b Or",
        "AND b OR c BUT !d",
        "a + OR c -d",
        "a && (b || )c !d", 
        "a b", 
        "a (b)", 
        "&&", 
        "( a ) )", 
        "word with space and without",
    ];
    
    notations.forEach(function (notation){
        it(notation, function(){
            const parser = new Parser(notation);
            //console.log(parser._exp)
            expect(()=>{
                parser.test("");
            }).toThrowError("Invalid Expression: " + notation);
        })
    })

});