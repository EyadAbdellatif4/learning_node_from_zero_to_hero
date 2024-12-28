const express = require("express");
const app = express();
const productsRouter = require("./product/product.router");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;

app.use(express.json());
console.log(process.env.hallow);
console.log(process.env.PORT);
// console.log(process.env);
// console.log(process.env.NODE_ENV);
console.log(process.env.username);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
