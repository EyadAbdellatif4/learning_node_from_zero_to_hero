const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  validateProduct,
} = require("../controllers/product.controller");

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProduct);

productsRouter.post("/", validateProduct, addProduct);

productsRouter.patch("/:id", updateProduct);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
