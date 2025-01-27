const Product = require("../models/product.model");

const getProducts = async (req, res) => {
  try {
    // Step 1: Copy the query parameters from the request
    // We use object destructuring to create a new object and avoid modifying the original `req.query`
    const queryStr = { ...req.query };

    // Step 2: Exclude fields that are not part of the MongoDB document
    // Fields like `sort`, `fields`, `page`, and `limit` are used for query manipulation, not filtering
    const excludeFields = ["sort", "fields", "page", "limit"];
    excludeFields.forEach((field) => delete queryStr[field]);

    // Step 3: Replace MongoDB operators (e.g., gt, lt) with their $ equivalents
    // This is necessary because MongoDB uses `$` prefixes for operators (e.g., `$gt`, `$lt`)
    let queryObj = JSON.stringify(queryStr);
    queryObj = queryObj.replace(
      /\b(gt|gte|lt|lte|ne)\b/g,
      (match) => `$${match}`
    );

    // Step 4: Parse the modified query string back into an object
    // This will be used as the filter for the MongoDB query
    const parsedQuery = JSON.parse(queryObj);

    // Step 5: Construct the base query using the parsed filter
    // This will find all documents that match the filter criteria
    let query = Product.find(parsedQuery);

    // Step 6: Debugging - Log the parsed query and sort parameter
    // This helps in understanding what the query looks like before execution
    console.log("Parsed Query:", parsedQuery);
    console.log("Sort Parameter:", req.query.sort);

    // Step 7: Apply sorting if the `sort` parameter is provided in the request
    if (req.query.sort) {
      // Convert the sort parameter into a format MongoDB understands
      // For example, "price,-rating" becomes "price -rating"
      const sortBy = req.query.sort.split(",").join(" ");
      console.log("Sort By:", sortBy); // Debugging: Log the sortBy value
      query = query.sort(sortBy); // Apply sorting to the query
    }

    // Step 8: Apply field limiting if the `fields` parameter is provided
    // This allows the client to specify which fields to include in the response
    console.log("The output of the req.query.fields here", req.query.fields);
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields); // Apply field selection to the query
    }

    // Step 9: Apply pagination if the `page` parameter is provided
    // This allows the client to request specific pages of data
    console.log("The output of the req.query.page here", req.query.page);
    if (req.query.page) {
      const page = req.query.page * 1 || 1; // Convert page to a number (default: 1)
      const limit = req.query.limit * 1 || 5; // Convert limit to a number (default: 5)
      const skip = (page - 1) * limit; // Calculate the number of documents to skip
      query = query.skip(skip).limit(limit); // Apply pagination to the query
    }

    // Step 10: Execute the query and retrieve the product list
    const productList = await query;

    // Step 11: Send the response with the product list
    res.status(200).json({
      message: "success",
      length: productList.length,
      data: productList,
    });
  } catch (err) {
    // Step 12: Handle any errors that occur during the process
    res.status(500).json({ message: "error", data: err });
  }
};

// Other controller functions (getProduct, addProduct, updateProduct, deleteProduct, validateProduct)
// are documented similarly with step-by-step comments.

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
};
