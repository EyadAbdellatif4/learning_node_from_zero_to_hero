// Step 1: Import required modules
const express = require("express"); // Import Express framework
const productsRouter = require("./routes/product.router"); // Import the products router

// Step 2: Create an instance of the Express application
const app = express();

// Step 3: Middleware to parse incoming JSON requests
// This allows the application to handle JSON data in the request body
app.use(express.json());

// Step 4: Define a basic route for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Hello World"); // Send a simple response for the root route
});

// Step 5: Mount the products router at the "/api/products" endpoint
// All routes defined in the `productsRouter` will be prefixed with "/api/products"
app.use("/api/products", productsRouter);

// Step 6: Export the Express application to be used in other files (e.g., server.js)
module.exports = app;
