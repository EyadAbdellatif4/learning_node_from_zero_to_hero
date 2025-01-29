// Step 1: Import required modules
const express = require("express"); // Import Express framework for routing
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  validateProduct,
  getTopRatedProducts,
  bestSaller,
  computeProductStats,
  MostSoldYear,
} = require("../controllers/product.controller"); // Import product controller functions

// Step 2: Create an instance of an Express router
const productsRouter = express.Router();

// Step 3: Define routes for the products resource

// Route 1: GET /products - Fetch all products
productsRouter.get("/", getProducts);

// Route 2: GET /products/top - Fetch top-rated products
// The `getTopRatedProducts` middleware filters the top-rated products before fetching them
productsRouter.get("/top", getTopRatedProducts, getProducts);

// Route 3: GET /products/best-seller - Fetch best-selling products
// The `bestSaller` middleware filters the best-selling products before fetching them
productsRouter.get("/best-seller", bestSaller, getProducts);

// Route 4: GET /products/stats - Compute and fetch product statistics
productsRouter.get("/stats", computeProductStats);

// Route 5: GET /products/most-sold-year - Fetch the year with the most products sold
productsRouter.get("/most-sold-year", MostSoldYear);

// Route 6: GET /products/:id - Fetch a single product by ID
productsRouter.get("/:id", getProduct);

// Route 7: POST /products - Add a new product
// The `validateProduct` middleware validates the request body before adding the product
productsRouter.post("/", validateProduct, addProduct);

// Route 8: PATCH /products/:id - Update an existing product by ID
productsRouter.patch("/:id", updateProduct);

// Route 9: DELETE /products/:id - Delete a product by ID
productsRouter.delete("/:id", deleteProduct);

// Step 4: Export the router to be used in the main application
module.exports = productsRouter;
