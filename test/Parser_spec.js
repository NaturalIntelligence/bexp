const Parser = require("../src/Parser");

describe("Should parse infix notation", function () {

    const runFocusedOnly = false;
    const testData = [
        {
            focus: false,
            exp: [ "a and b" , "(a and b)" ],
            tests: [
                { input: "a", expected: false },
                { input: "b", expected: false },
                { input: ["a", "b"], expected: true },
                { input: "", expected: false },
                { input: [ "" ], expected: false },
            ]
        },
        {
            exp: [ "a or b" , "(a or b)" ],
            tests: [
                { input: "a", expected: true },
                { input: "b", expected: true },
                { input: ["a", "b"], expected: true },
                { input: ["a", ""], expected: true },
                { input: ["", "b"], expected: true },
                { input: ["", ""], expected: false },
                { input: [""], expected: false },
                { input: "", expected: false },
            ]
        },
        {
            exp: [ "!a" , "!(a)", "(!a)", "not a", "   -a " ],
            tests: [
                { input: "a", expected: false },
                { input: "b", expected: true },
                { input: ["a", "b"], expected: false },
            ]
        },
        {
            exp: [ "( a and b ) or ( c and d )" , "( ( a and b ) or ( c and d ) )"],
            tests: [
                { input: "a", expected: false },
                { input: "b", expected: false },
                { input: ["a", "b"], expected: true },
                { input: ["a", "c"], expected: false },
            ]
        },
        {
            exp: [ "not a or b and not c or not d or e and f" , "( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )"],
            tests: [
                { input: "a", expected: true },
                { input: "b", expected: true },
                { input: "c", expected: true },
            ]
        },
        {
            exp: [ "a - b"],
            tests: [
                { input: "a", expected: true },
                { input: "b", expected: false },
                { input: ["a", "b"], expected: false },
            ]
        },
        {
            exp: [ ""],
            tests: [
                { input: "a", expected: true },
                { input: "b", expected: true },
                { input: ["a", "b"], expected: true },
            ]
        },
        /* {
            exp: [ "word with space or without"],
            tests: [
                { input: "word with space", expected: true },
                { input: "without", expected: true },
            ]
        }, */

    ]
    
    testData.forEach(function (data) {

        data.exp.forEach(function (exp) {
            if(runFocusedOnly && data.focus) return;

            it(exp, function () {
                const parser = new Parser(exp);
               
                data.tests.forEach(function (test){
                    expect(parser.test(test.input)).toBe( test.expected);
                })
            });

        })

    })
    

    it("A parser instance should test multiple keywords", function () {
        const parser = new Parser("", {
            onEmpty : true
        });
        expect(parser.test("z")).toBeTruthy();
    });

});