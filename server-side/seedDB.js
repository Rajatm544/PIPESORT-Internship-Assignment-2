const Product = require("./models/product.model");
const faker = require("faker");

Product.deleteMany({}, () => console.log("All Deleted!"));

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
