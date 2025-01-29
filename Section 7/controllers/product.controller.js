const Product = require("../models/product.model");
const ApiFilters = require("../utils/APIFilter");
const getProducts = async (req, res) => {
  try {
    // Step 1: Create an instance of ApiFilters and apply filtering
    // const filter = new ApiFilters(Product.find(), req.query).filter();
    const filter = new ApiFilters(Product.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();

    // // Step 2: Apply sorting if the `sort` parameter is provided
    // if (req.query.sort) {
    //   filter.sort();
    // }

    // // Step 3: Apply field limiting if the `fields` parameter is provided
    // if (req.query.fields) {
    //   filter.fields(); // Call the correct method: `fields()` instead of `limit()`
    // }

    // // Step 4: Apply pagination if the `page` parameter is provided
    // if (req.query.page) {
    //   filter.paginate(); // Call the correct method: `paginate()`
    // }

    // Step 5: Execute the query and retrieve the product list
    const productList = await filter.query.exec();

    // Step 6: Send the response with the product list
    res.status(200).json({
      message: "success",
      length: productList.length,
      data: productList,
    });
  } catch (err) {
    // Step 7: Handle any errors that occur during the process
    res.status(500).json({ message: "error", data: err.message });
  }
};

const getTopRatedProducts = async (req, res, next) => {
  req.query.sort = "-rating,price";
  req.query.limit = 6;
  next();
};

const bestSaller = async (req, res, next) => {
  req.query.sort = "stock";
  req.query.limit = 10;
  next();
};

const computeProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $match: { rating: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: "$category",
          numProducts: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          avgRating: { $avg: "$rating" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          numberOfProducts: { $sum: 1 },
        },
      },
      {
        $sort: { avgPrice: -1 },
      },
    ]);

    res
      .status(200)
      .json({ message: "success", length: stats.length, data: stats });
  } catch (err) {
    res.status(500).json({ message: "error", data: err.message });
  }
};

const MostSoldYear = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $unwind: "$images",
      },
      {
        $match: { rating: { $gte: 4.5 } },
      },
      // {
      //   $match: { orderDates: { $gte: new Date(`req.params.year-1-1`), $lte: new Date(`req.params.year-12-31`) } },
      // },
      {
        $group: {
          _id: "$month",
          numProducts: { $sum: 1 },
          $product: { $push: { title: "$title", price: "$price" } },
        },
      },
      {
        $sort: { numProducts: -1 },
      },
      {
        $limit: 1,
      },
      {
        $addFields: {
          month: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    res
      .status(200)
      .json({ message: "success", length: stats.length, data: stats });
  } catch (err) {
    res.status(500).json({ message: "error", data: err.message });
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
  getTopRatedProducts,
  bestSaller,
  computeProductStats,
  MostSoldYear,
};
