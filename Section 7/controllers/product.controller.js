const Product = require("../models/product.model");
const ApiFilters = require("../utils/APIFilter");

// Controller function to get a list of products with filtering, sorting, field limiting, and pagination
const getProducts = async (req, res) => {
  try {
    // Step 1: Create an instance of ApiFilters and apply filtering, sorting, field limiting, and pagination
    const filter = new ApiFilters(Product.find(), req.query)
      .filter() // Apply filtering based on query parameters
      .sort() // Apply sorting based on query parameters
      .fields() // Limit fields based on query parameters
      .paginate(); // Apply pagination based on query parameters

    // Step 2: Execute the query and retrieve the product list
    const productList = await filter.query.exec();

    // Step 3: Send the response with the product list
    res.status(200).json({
      message: "success",
      length: productList.length,
      data: productList,
    });
  } catch (err) {
    // Step 4: Handle any errors that occur during the process
    res.status(500).json({ message: "error", data: err.message });
  }
};

// Middleware to modify the query for getting top-rated products
const getTopRatedProducts = async (req, res, next) => {
  // Step 1: Set the sort parameter to sort by rating (descending) and price
  req.query.sort = "-rating,price";
  // Step 2: Limit the number of results to 6
  req.query.limit = 6;
  // Step 3: Pass control to the next middleware or controller
  next();
};

// Middleware to modify the query for getting best-selling products
const bestSaller = async (req, res, next) => {
  // Step 1: Set the sort parameter to sort by stock (ascending)
  req.query.sort = "stock";
  // Step 2: Limit the number of results to 10
  req.query.limit = 10;
  // Step 3: Pass control to the next middleware or controller
  next();
};

// Controller function to compute product statistics based on rating
const computeProductStats = async (req, res) => {
  try {
    // Step 1: Use MongoDB aggregation to compute statistics for products with a rating >= 4.5
    const stats = await Product.aggregate([
      {
        $match: { rating: { $gte: 4.5 } }, // Match products with rating >= 4.5
      },
      {
        $group: {
          _id: "$category", // Group by category
          numProducts: { $sum: 1 }, // Count the number of products in each category
          avgPrice: { $avg: "$price" }, // Calculate the average price
          avgRating: { $avg: "$rating" }, // Calculate the average rating
          minPrice: { $min: "$price" }, // Find the minimum price
          maxPrice: { $max: "$price" }, // Find the maximum price
          numberOfProducts: { $sum: 1 }, // Count the number of products
        },
      },
      {
        $sort: { avgPrice: -1 }, // Sort by average price in descending order
      },
    ]);

    // Step 2: Send the computed statistics in the response
    res
      .status(200)
      .json({ message: "success", length: stats.length, data: stats });
  } catch (err) {
    // Step 3: Handle any errors
    res.status(500).json({ message: "error", data: err.message });
  }
};

// Controller function to find the most sold products in a given year
const MostSoldYear = async (req, res) => {
  try {
    // Step 1: Use MongoDB aggregation to find the most sold products
    const stats = await Product.aggregate([
      {
        $unwind: "$images", // Unwind the images array (if needed)
      },
      {
        $match: { rating: { $gte: 4.5 } }, // Match products with rating >= 4.5
      },
      {
        $group: {
          _id: "$month", // Group by month
          numProducts: { $sum: 1 }, // Count the number of products sold
          $product: { $push: { title: "$title", price: "$price" } }, // Push product details into an array
        },
      },
      {
        $sort: { numProducts: -1 }, // Sort by the number of products sold in descending order
      },
      {
        $limit: 1, // Limit the result to the top-selling month
      },
      {
        $addFields: {
          month: "$_id", // Add the month field to the result
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the result
        },
      },
    ]);

    // Step 2: Send the result in the response
    res
      .status(200)
      .json({ message: "success", length: stats.length, data: stats });
  } catch (err) {
    // Step 3: Handle any errors
    res.status(500).json({ message: "error", data: err.message });
  }
};

// Controller function to get a single product by ID
const getProduct = async (req, res) => {
  try {
    // Step 1: Find a product by its ID
    const product = await Product.findOne({ _id: req.params.id });

    // Step 2: Send the product data in the response
    res.status(200).json({ message: "success", data: product });
  } catch (err) {
    // Step 3: Handle any errors
    res.status(500).json({ message: "error", data: err });
  }
};

// Controller function to add a new product
const addProduct = async (req, res) => {
  try {
    // Step 1: Create a new product using the request body
    const newProduct = await Product.create(req.body);

    // Step 2: Send the newly created product in the response
    res.status(200).json({ message: "success", data: newProduct });
  } catch (err) {
    // Step 3: Handle any errors
    res.status(500).json({ message: "error", data: err });
  }
};

// Controller function to update a product by ID
const updateProduct = async (req, res) => {
  try {
    // Step 1: Find and update the product by its ID
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });

    // Step 2: Send the updated product in the response
    res.status(200).json({ message: "success", data: product });
  } catch (err) {
    // Step 3: Handle any errors
    res.status(500).json({ message: "error", data: err });
  }
};

// Controller function to delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    // Step 1: Find and delete the product by its ID
    const product = await Product.findByIdAndDelete(req.params.id);

    // Step 2: Send the deleted product in the response
    res.status(200).json({ message: "success", data: product });
  } catch (err) {
    // Step 3: Handle any errors
    res.status(500).json({ message: "error", data: err });
  }
};

// Middleware to validate the request body before adding or updating a product
const validateProduct = (req, res, next) => {
  // Step 1: Log the request body for debugging
  console.log(req.body);

  // Step 2: Validate that the request body contains a `title` field
  if (req.body.title) {
    next(); // Proceed to the next middleware or controller
  } else {
    // Step 3: Send an error response if validation fails
    res.status(400).json({ message: "Invalid data" });
  }
};

// Export all controller functions
module.exports = {
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
};
