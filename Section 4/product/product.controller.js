const fs = require("fs");
const productList = fs.readFileSync(
  `${__dirname}/../data/products.json`,
  "utf-8"
);

const prodList = JSON.parse(productList);

const getProducts = (req, res) => {
  console.log(prodList.products[0].id);
  res.status(200).json({ message: "success", data: prodList.products });
};
const getProduct = (req, res) => {
  const id = req.params.id;
  const product = prodList.products.find((prod) => prod.id == id);
  console.log(product);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "success", data: product });
};

const addProduct = (req, res) => {
  const newProduct = req.body;
  const id = prodList.products[prodList.products.length - 1].id + 1;
  const product = { id, ...newProduct };
  prodList.products.push(product);
  fs.writeFileSync(
    `${__dirname}/../data/products.json`,
    JSON.stringify(prodList)
  );
  res.status(201).json({ message: "success", data: newProduct });
};

const updateProduct = (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  const product = prodList.products.find((prod) => prod.id == id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  prodList.products = prodList.products.map((prod) => {
    if (prod.id == id) {
      return { ...prod, ...updatedProduct };
    }
    return prod;
  });
  fs.writeFileSync(
    `${__dirname}/../data/products.json`,
    JSON.stringify(prodList)
  );
  res.status(200).json({ message: "success", data: updatedProduct });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  const product = prodList.products.find((prod) => prod.id == id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  prodList.products = prodList.products.filter((prod) => prod.id != id);
  fs.writeFileSync(
    `${__dirname}/../data/products.json`,
    JSON.stringify(prodList)
  );
  res.status(200).json({ message: "success", data: product });
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
