// Step 1: Import required modules
const express = require("express"); // Import Express framework for routing
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  validateProduct,
} = require("../controllers/product.controller"); // Import product controller functions

// Step 2: Create an instance of an Express router
const productsRouter = express.Router();

// Step 3: Define routes for the products resource

// Route 1: GET /products - Fetch all products
productsRouter.get("/", getProducts);

// Route 2: GET /products/:id - Fetch a single product by ID
productsRouter.get("/:id", getProduct);

// Route 3: POST /products - Add a new product
// The `validateProduct` middleware is used to validate the request body before adding the product
productsRouter.post("/", validateProduct, addProduct);

// Route 4: PATCH /products/:id - Update an existing product by ID
productsRouter.patch("/:id", updateProduct);

// Route 5: DELETE /products/:id - Delete a product by ID
productsRouter.delete("/:id", deleteProduct);

// Step 4: Export the router to be used in the main application
module.exports = productsRouter;
