const Product = require("./models/product.model");
const faker = require("faker");

// Delete previous data stored in the DB
Product.deleteMany({}, () => console.log("All Deleted!"));

// Store 100 products in the DB
const seed = () => {
    for (let i = 0; i < 100; i++) {
        const price = faker.finance.amount(0, 10000, 0, "");
        const color = faker.commerce.color();
        const dept = faker.commerce.department();
        const name = faker.commerce.productName(dept);

        const newProduct = new Product({
            name: name,
            dept: dept,
            color: color,
            price: price,
        });

        newProduct.save();
    }
};

module.exports = seed;
