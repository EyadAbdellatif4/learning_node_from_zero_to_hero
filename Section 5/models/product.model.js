const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
  },
  name: String,
  price: { type: Number, default: 200 },
  category: String,
});

const Product = new mongoose.model("Product", productschema);

module.exports = Product;
