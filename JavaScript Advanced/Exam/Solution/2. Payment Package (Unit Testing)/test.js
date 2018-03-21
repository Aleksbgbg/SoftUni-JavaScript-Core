const expect = require("chai").expect;
const PaymentPackage = require("./payment-package.js").PaymentPackage;

describe("Payment Package Functionality Tests", function() {
    describe("Pre-testing.", function() {
        it("'PaymentPackage' should be a function.", function() {
            expect(typeof(PaymentPackage)).to.equal("function");
        });
    });

    describe("Constructor tests.", function() {
        it("'new PaymentPackage('Hello', 5)' should not throw any exceptions.", function() {
            expect(function() {
                new PaymentPackage("Hello", 5);
            }).to.not.throw();
        });

        it("'new PaymentPackage('Hello', 5.5)' should not throw any exceptions.", function() {
            expect(function() {
                new PaymentPackage("Hello", 5.5);
            }).to.not.throw();
        });

        it("'new PaymentPackage('Hello', 5.5)' should have a value of '5.5'.", function() {
            expect(new PaymentPackage("Hello", 5.5).value).to.equal(5.5);
        });

        it("'new PaymentPackage('Hello', -5)' should throw exception.", function() {
            expect(function() {
                new PaymentPackage("Hello", -5);
                console.log(x);
            }).to.throw();
        });

        it("'new PaymentPackage('Hello', 5)' should appropriately assign name.", function() {
            expect(new PaymentPackage("Hello", 5).name).to.equal("Hello");
        });

        it("'new PaymentPackage('Hello', 5)' should appropriately assign value.", function() {
            expect(new PaymentPackage("Hello", 5).value).to.equal(5);
        });

        it("'new PaymentPackage('Hello', 5)' should have a default VAT of 20.", function() {
            expect(new PaymentPackage("Hello", 5).VAT).to.equal(20);
        });

        it("'new PaymentPackage('Hello', 5)' should have a default 'active' of 'true'.", function() {
            expect(new PaymentPackage("Hello", 5).active).to.be.true;
        });
    });

    describe("Accessor tests.", function() {
        describe("'name' accessor.", function() {
            it("'name' should have a get accessor.", function() {
                expect(new PaymentPackage("Hello", 5).name).to.equal("Hello");
            });

            it("'name' should have a set accessor.", function() {
                const paymentPackage = new PaymentPackage("Hello", 5);

                paymentPackage.name = "Goodbye";

                expect(paymentPackage.name).to.equal("Goodbye");
            });
        });

        describe("'value' accessor.", function() {
            it("'value' should have a get accessor.", function() {
                expect(new PaymentPackage("Hello", 5).value).to.equal(5);
            });

            it("'value' should have a set accessor.", function() {
                const paymentPackage = new PaymentPackage("Hello", 5);

                paymentPackage.value = 5;

                expect(paymentPackage.value).to.equal(5);
            });
        });

        describe("'VAT' accessor.", function() {
            it("'VAT' should have a get accessor.", function() {
                expect(new PaymentPackage("Hello", 5).VAT).to.equal(20);
            });

            it("'VAT' should have a set accessor.", function() {
                const paymentPackage = new PaymentPackage("Hello", 5);

                paymentPackage.VAT = 100;

                expect(paymentPackage.VAT).to.equal(100);
            });
        });

        describe("'active' accessor.", function() {
            it("'active' should have a get accessor.", function() {
                expect(new PaymentPackage("Hello", 5).active).to.equal(true);
            });

            it("'active' should have a set accessor.", function() {
                const paymentPackage = new PaymentPackage("Hello", 5);

                paymentPackage.active = false;

                expect(paymentPackage.active).to.be.false;
            });
        });
    });

    describe("toString tests.", function() {
        it("'PaymentPackage.toString()' should return string type.", function() {
            expect(typeof(new PaymentPackage("Hello", 5).toString())).to.equal("string");
        });

        it("'PaymentPackage.toString()' should accuractely label active packages.", function() {
            expect(new PaymentPackage("Hello", 5).toString()).to.not.contains("(inactive)");
        });

        it("'PaymentPackage.toString()' should accuractely label inactive packages.", function() {
            const paymentPackage = new PaymentPackage("Hello", 5);

            paymentPackage.active = false;

            expect(paymentPackage.toString()).to.contains("(inactive)");
        });

        it("'PaymentPackage.toString()' should be accurate to the data of the instance.", function() {
            const paymentPackage = new PaymentPackage("Hello", 5);

            expect([paymentPackage.toString()]).to.all.equal([
                `Package: ${paymentPackage.name}` + (paymentPackage.active ? "" : " (inactive)"),
                `- Value (excl. VAT): ${paymentPackage.value}`,
                `- Value (VAT ${paymentPackage.VAT}%): ${paymentPackage.value * (1 + paymentPackage.VAT / 100)}`
            ].join("\n"));
        });
    });

    describe("Property validation tests.", function() {
        describe("'name' validation tests.", function() {
            it("'name' should accept a string.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).name = "Goodbye";
                }).to.not.throw();
            });

            it("'name' should not accept a non-string (number).", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).name = 5;
                }).to.throw();
            });

            it("'name' should not accept an empty string.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).name = "";
                }).to.throw();
            });
        });

        describe("'value' validation tests.", function() {
            it("'value' should accept a number.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).value = 10;
                }).to.not.throw();
            });

            it("'value' should not accept a non-number (string).", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).value = "Hello";
                }).to.throw();
            });

            it("'value' should not accept a negative number.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).value = -5;
                }).to.throw();
            });

            it("'value' should accept a fraction.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).value = 5.03;
                }).to.not.throw();
            });
        });

        describe("'VAT' validation tests.", function() {
            it("'VAT' should accept a number.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).VAT = 5;
                }).to.not.throw();
            });

            it("'VAT' should not accept a non-number (string).", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).VAT = "Hello";
                }).to.throw();
            });

            it("'VAT' should not accept a negative number.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).VAT = -5;
                }).to.throw();
            });

            it("'VAT' should accept a fraction.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).VAT = 5.03;
                }).to.not.throw();
            });
        });

        describe("'active' validation tests.", function() {
            it("'active' should accept a boolean.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).active = false;
                }).to.not.throw();
            });

            it("'active' should not accept a non-boolean (number).", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).active = 5;
                }).to.throw();
            });

            it("'active' should not accept an empty string.", function() {
                expect(function() {
                    new PaymentPackage("Hello", 5).active = "";
                }).to.throw();
            });
        });
    });
});