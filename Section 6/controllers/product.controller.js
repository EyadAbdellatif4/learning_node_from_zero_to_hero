
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
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "success", length: products.length, data: products });
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
