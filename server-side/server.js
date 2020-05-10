const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const seedDB = require("./seedDB");
require("dotenv").config();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () =>
    console.log("MongoDB database connection has been established!")
);

seedDB();
const productRoutes = require("./routes/products");
app.use("/product", productRoutes);

//Load the npm build package of the frontend CRA
if (process.env.NODE_ENV === "production") {
    // set a static folder
    app.use(express.static("client-side/build"));

    // Provide a wildcard as a fallback for all routes
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../client-side", "build", "index.html")
        );
    });
}

app.listen(PORT, () => {
    console.log("Server running on PORT " + PORT);
});
