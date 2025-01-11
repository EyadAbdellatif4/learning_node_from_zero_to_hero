const express = require("express");
const app = express();
const productsRouter = require("./routes/product.router");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productsRouter);





module.exports = app;
