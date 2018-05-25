class PaymentProcessor {
    constructor(options) {
        this.payments = { };

        this.options = { };

        this.setOptions(options);
    }

    registerPayment(id, name, type, value) {
        if (typeof id !== "string") {
            throw new TypeError("Payment 'ID' must be string.");
        }

        if (id === "") {
            throw new RangeError("Payment 'ID' must be non-empty string.");
        }

        if (typeof name !== "string") {
            throw new TypeError("Payment 'name' must be string.");
        }

        if (name === "") {
            throw new RangeError("Payment 'name' must be non-empty string.");
        }

        if (typeof value !== "number") {
            throw new TypeError("Payment 'value' must be number.");
        }

        if (this.options.types.indexOf(type) === -1) {
            throw new Error("Payment 'type' not set in options.");
        }

        if (this.payments.hasOwnProperty(id)) {
            throw new Error(`Payment under ID '${id}' already registered.`);
        }

        this.payments[id] = {
            name,
            type,
            value
        };
    }

    deletePayment(id) {
        if (!this.payments.hasOwnProperty(id)) {
            throw new RangeError(`No payment of ID '${id}' exists.`);
        }

        delete this.payments[id];
    }

    get(id) {
        if (!this.payments.hasOwnProperty(id)) {
            throw new RangeError(`No payment of ID '${id}' exists.`);
        }

        const payment = this.payments[id];

        return `Details about payment ID: ${id}
- Name: ${payment.name}
- Type: ${payment.type}
- Value: ${payment.value.toFixed(this.options.precision)}`;
    }

    setOptions(options) {
        for (const property in options) {
            this.options[property] = options[property];
        }

        for (const property of ["types", "precision"]) {
            if (!this.options.hasOwnProperty(property)) {
                this.options[property] = {
                    types: ["service", "product", "other"],
                    precision: 2
                }[property];
            }
        }
    }

    toString() {
        const keys = Object.keys(this.payments);

        return `Summary:
- Payments: ${keys.length}
- Balance: ${keys
            .reduce((accumulator, currentKey) => accumulator + this.payments[currentKey].value, 0)
            .toFixed(this.options.precision)}
${keys
            .map(key => this.get(key))
            .join("\n")}`;
    }
}

module.exports = {
    PaymentProcessor
};

// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

try {
    // Should throw an error (invalid type)
    generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);
} catch (error) {
    console.log(error);
}

generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

try {
    // Should throw an error (ID not found)
    generalPayments.deletePayment('E027');
} catch (error) {
    console.log(error);
}

try {
    // Should throw an error (ID not found)
    generalPayments.get('E027');
} catch (error) {
    console.log(error);
}

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());