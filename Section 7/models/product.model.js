// Step 1: Import Mongoose for MongoDB schema and model creation
const mongoose = require("mongoose");

// Step 2: Define the schema for the Product collection
const productschema = new mongoose.Schema(
  {
    // Step 3: Define the `title` field
    title: {
      type: String, // Data type is String
      required: [true, "A product must have a name"], // Field is required, with a custom error message
      unique: true, // Ensures that no two products can have the same title
    },

    // Step 4: Define the `description` field
    description: {
      type: String, // Data type is String
    },

    // Step 5: Define the `price` field
    price: {
      type: Number, // Data type is Number
    },

    // Step 6: Define the `discountPercentage` field
    discountPercentage: {
      type: Number, // Data type is Number
    },

    // Step 7: Define the `rating` field
    rating: {
      type: Number, // Data type is Number
    },

    // Step 8: Define the `stock` field
    stock: {
      type: Number, // Data type is Number
    },

    // Step 9: Define the `brand` field
    brand: {
      type: String, // Data type is String
    },

    // Step 10: Define the `category` field
    category: {
      type: String, // Data type is String
    },

    // Step 11: Define the `thumbnail` field
    thumbnail: {
      type: String, // Data type is String
    },

    // Step 12: Define the `images` field
    images: {
      type: [String], // Data type is an array of Strings
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// virtual propertys
// productschema.virtual("priceAfterDiscount").get(function () {
//   return this.price - (this.price * this.discountPercentage) / 100;
// });

// productschema.virtual("sulg").get(function () {
//   return slugify(this.title, { lower: true });
// });
// Step 13: Create the Product model from the schema
// The model represents a collection in the MongoDB database
const Product = new mongoose.model("Product", productschema);

// Step 14: Export the Product model for use in other parts of the application
module.exports = Product;
