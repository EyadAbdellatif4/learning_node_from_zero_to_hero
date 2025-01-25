const Product = require("../models/product.model");
const getProducts = async (req, res) => {
  // Product.find()
  //   .then((doc) => {
  //     res.status(200).json({ message: "success", data: doc });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ message: "error", data: err });
  //   });

  ////// ooooorrrrrr
  try {
    //// thi is happen because they are looking in the same memory and to solve it we have to use object destructuring
    // const queryStr = { ...req.query };
    // console.log(queryStr);
    // console.log(req.query);
    // delete queryStr.price;
    // console.log(queryStr);
    // console.log(req.query);

    // const queryStr = { ...req.query };
    // const excludeFields = ["price", "limit"];
    // excludeFields.forEach((field) => delete queryStr[field]);
    // console.log(queryStr);

    const queryStr = { ...req.query };
    let queryObj = JSON.stringify(queryStr);
    console.log(queryObj);
    queryObj = queryObj.replace(
      /\b(gt|gte|lt|lte|ne)\b/g,
      (match) => `$${match}`
    );
    console.log(queryObj);

    // const products = await Product.find(JSON.parse(queryObj));

    let query = Product.find(JSON.parse(queryObj));
    console.log(re.query);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      // query = query.sort(req.query.sort);
      query = query.sort(sortBy);
    }

    if(req.query.fields){
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
    }

    if (req.query.page) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 5;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }
    const productList = await query;
    // const products = await Product.find(JSON.parse(queryStr)).sort("price");
    // const products = await Product.find(req.query).sort("-price");

    ///////////////// this will return the query
    // const products = Product.find(req.query).sort("-price");
    // console.log(products);
    res
      .status(200)
      .json({
        message: "success",
        length: productList.length,
        data: productList,
      });
  } catch (err) {
    res.status(500).json({ message: "error", data: err });
  }
};
const getProduct = async (req, res) => {
  try {
    // const product = await Product.findById(req.params.id);
    // res.status(200).json({ message: "success", data: product });

    /////// ooooorrrrrr
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).json({ message: "success", data: product });
  } catch (err) {
    res.status(500).json({ message: "error", data: err });
  }
};

const addProduct = async (req, res) => {
  //   const newProduct = new Product({
  //     title: "product three",
  //   name: "eyad",
  //   price: 5,
  //   category: "human",
  // });
  // newProduct
  //   .save()
  //   .then((doc) => {
  //     console.log("saved", doc);
  //     res.status(200).json({ message: "success", data: doc });
  //   })
  //   .catch((err) => {
  //     console.log("error", err);
  //   });
  ////////////// ooooorrrrrr
  try {
    // const newProduct = new Product(req.body);
    // await newProduct.save();
    // res.status(200).json({ message: "success", data: newProduct });

    /////// ooooorrrrrr
    const newProduct = await Product.create(req.body);
    res.status(200).json({ message: "success", data: newProduct });
  } catch (err) {
    res.status(500).json({ message: "error", data: err });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "success", data: product });
  } catch (err) {
    res.status(500).json({ message: "error", data: err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "success", data: product });
  } catch (err) {
    res.status(500).json({ message: "error", data: err });
  }
};

const validateProduct = (req, res, next) => {
  console.log(req.body);
  if (req.body.title) {
    next();
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
};
module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  validateProduct,
};
