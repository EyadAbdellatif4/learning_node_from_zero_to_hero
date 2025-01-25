const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
  },
  description: String,
  price: { type: Number, default: 200 },
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
});

const Product = new mongoose.model("Product", productschema);

module.exports = Product;
