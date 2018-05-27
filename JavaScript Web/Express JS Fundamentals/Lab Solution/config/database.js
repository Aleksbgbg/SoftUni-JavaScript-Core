const fs = require("fs");
const path = require("path");

const databasePath = path.join(__dirname, "database.json");

module.exports = {
    products: {
        getAll() {
            if (!fs.existsSync(databasePath)) {
                fs.writeFileSync(databasePath, "[]");
            }

            return JSON.parse(fs.readFileSync(databasePath).toString());
        },
        add(product) {
            const products = this.getAll();

            product.id = products.length + 1;
            products.push(product);

            fs.writeFileSync(databasePath, JSON.stringify(products));
        },
        findByName(name) {
            return products.filter(product => product.name.toLowerCase().includes(name));
        }
    }
};