const Parser = require("../src/Parser");

describe("Should parse infix notation", function () {

    notations = [
        "a and b or c but !d",
        "a And b Or c But !d",
        "a AND b OR c BUT !d",
        "a + b OR c -d",  //when operand is not given before `not` then it is considered as AND
        "a + b || c -d", 
        "a && b || c !d", 
        "a && b || c !d", 
    ];
    
    notations.forEach(function (notation){
        it(notation, function(){
            const parser = new Parser(notation);
            //console.log(parser._exp)
            expect(parser.test("a")).toBeFalsy();
            expect(parser.test("b")).toBeFalsy();
            expect(parser.test("c")).toBeTruthy();
            expect(parser.test("d")).toBeFalsy();
            expect(parser.test(["a", "b"])).toBeTruthy();
            expect(parser.test(["a", "b", "d"])).toBeTruthy();
            expect(parser.test(["c", "d"])).toBeFalsy();
        })
    })

});