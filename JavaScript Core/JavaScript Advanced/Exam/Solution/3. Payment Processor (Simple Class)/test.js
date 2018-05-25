//let PaymentProcessor = result;
const expect = require("chai").expect;
const PaymentProcessor = require("./payment-processor.js").PaymentProcessor;

const generalPayments = new PaymentProcessor();

it("tests", function() {
    function error1() {
        generalPayments.registerPayment('', 'Microchips', 'product', 15000);
    }

    function error2() {
        generalPayments.registerPayment('0001', '', 'product', 15000);
    }

    function error3() {
        generalPayments.registerPayment('0001', 'Microchips', 'material', 15000);
    }

    function error4() {
        generalPayments.registerPayment('0001', 'Microchips', 'product', 'money');
    }

    function error5() {
        const entry = generalPayments.get('0001');
    }

    function error6() {
        generalPayments.deletePayment('0001');
    }

    expect(error1, "Invalid ID was not detected").to.throw();
    expect(error2, "Invalid name was not detected").to.throw();
    expect(error3, "Invalid type was not detected").to.throw();
    expect(error4, "Invalid value was not detected").to.throw();
    expect(error5, "Getting missing entry should throw").to.throw();
    expect(error6, "Deleting missing entry should throw").to.throw();

    generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);

    function error7() {
        generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
    }

    expect(error7, "Adding duplicate ID should throw").to.throw();
});

it("tests 2", function() {
    const generalPayments = new PaymentProcessor();

    const emptyProc = generalPayments.toString();
    expect(emptyProc).to.include('Payments: 0');
    expect(emptyProc).to.include('Balance: 0');

    generalPayments.registerPayment('0001', 'Microchips', 'product', 15000.03);
    const oneProc = generalPayments.toString();
    expect(oneProc).to.include('Payments: 1');
    expect(oneProc).to.include('Balance: 15000.03');

    generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
    generalPayments.registerPayment('01', 'HR Consultation', 'service', 3000);
    const manyProc = generalPayments.toString();
    expect(manyProc).to.include('Payments: 3');
    expect(manyProc).to.include('Balance: 41000.03');

    const details = generalPayments.get('0001');
    expect(details).to.include('Name: Microchips');
    expect(details).to.include('Type: product');
    expect(details).to.include('Value: 15000.03');
});
