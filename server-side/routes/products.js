const router = require("express").Router();
const Product = require("../models/product.model");

// GET the products from the DB
router.route("/").get((req, res) => {
    Product.find()
        .then((products) => res.json(products))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
