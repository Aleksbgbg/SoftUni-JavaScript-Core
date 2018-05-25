const expect = require("chai").expect;

const Console = require("./console.js").Console;

describe("C# Console Tests", function() {
    describe("General tests", function() {
        it("writeLine should be a function.", function() {
            expect(typeof Console.writeLine).to.equal("function");
        });

        it("writeLine should not return undefined.", function() {
            expect(Console.writeLine("Test")).not.equal(undefined);
        });
    });

    describe("writeLine(string) tests", function() {
        it("writeLine(\"Test\") should return 'Test'", function() {
            expect(Console.writeLine("Test")).to.equal("Test");
        });
    });

    describe("writeLine(object) tests", function() {
        it("writeLine({ x: 0, y: 10 }) should return '{ x: 0, y: 10 }'", function() {
            expect(Console.writeLine({ x: 0, y: 10 })).to.equal(JSON.stringify({ x: 0, y: 10 }));
        });
    });

    describe("writeLine(templateString, parameters) tests", function() {
        it("writeLine(1, 2, 3) should throw TypeError", function() {
            expect(function() {
                Console.writeLine(1, 2, 3);
            }).to.throw(TypeError);
        });

        it("writeLine('Hello {1} {2} {3}, 1, 2, 3, 4) to throw RangeError", function() {
            expect(function() {
                Console.writeLine("Hello {1} {2} {3}", 1, 2, 3, 4);
            }).to.throw(RangeError);
        });

        it("writeLine('Hello {15}', 1) should throw RangeError", function() {
            expect(function() {
                Console.writeLine("Hello {15}", 1);
            }).to.throw(RangeError);
        });

        it("writeLine('Hello {0} {1} {2} {3}', 0, 1, 2, 3) should equal 'Hello 0 1 2 3'", function() {
            expect(Console.writeLine("Hello {0} {1} {2} {3}", 0, 1, 2, 3)).to.equal("Hello 0 1 2 3");
        });
    });
});