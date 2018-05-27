const products = [];

module.exports = {
    products: {
        getAll: () => products,
        add: function(product) {
            product.id = products.length;
            products.push(product);
        },
        findByName: function(name) {
            const matchedProducts = products.filter(product => product.name === name);

            if (matchedProducts.length === 1) {
                return matchedProducts[1];
            }

            return matchedProducts;
        }
    }
};