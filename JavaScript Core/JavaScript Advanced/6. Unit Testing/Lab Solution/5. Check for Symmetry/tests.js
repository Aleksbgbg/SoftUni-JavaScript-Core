const expect = require("chai").expect;

const isSymmetric = require("./check-for-symmetry.js").isSymmetric;

describe("Check for symmetry tests.", function() {
    describe("Preparation tests.", function() {
        it("'isSymmetric' should be a function.", function() {
            expect(typeof(isSymmetric)).to.equal("function");
        });
    });

    describe("Symmetric tests.", function() {
        it("'[1, 2, 1]' should be symmetric.", function() {
            expect(isSymmetric([1, 2, 1])).to.be.true;
        });

        it("'[1, 1]' should be symmetric.", function() {
            expect(isSymmetric([1, 1])).to.be.true;
        });

        it("'[1]' should be symmetric.", function() {
            expect(isSymmetric([1])).to.be.true;
        });

        it("'[]' should be symmetric.", function() {
            expect(isSymmetric([])).to.be.true;
        });
    });

    describe("Non-symmetric tests.", function() {
        it("'[1, 2, 3]' should not be symmetric.", function() {
            expect(isSymmetric([1, 2, 3])).to.be.false;
        });

        it("'[1, 2]' should not be symmetric.", function() {
            expect(isSymmetric([1, 2])).to.be.false;
        });
    });

    describe("Edge cases.", function() {
        it("'[0, new Date(), { 1: 2 }, { 1: 2 }, new Date(), 0]' should be symmetric.", function() {
            expect(isSymmetric([0, new Date(), { 1: 2}, { 1: 2 }, new Date(), 0])).to.be.true;
        });

        it("'1, 2, 3' should not be symmetric.", function() {
            expect(isSymmetric(1, 2, 3)).to.be.false;
        });
    });

    describe("Invalid tests.", function() {
        it("'null' should not be symmetric.", function() {
            expect(isSymmetric(null)).to.be.false;
        });
    });
});