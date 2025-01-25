const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("../models/product.model");
dotenv.config({ path: ".env" });

const conectionString = process.env.DB.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);
console.log(conectionString);

function importDataToDB() {
  const ProductsList = JSON.parse(
    fs.readFileSync(`${__dirname}/products.json`, "utf-8")
  );
  // console.log(ProductsList)
  Product.create(ProductsList)
    .then((res) => {
      console.log("data imported successfully");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      process.exit();
    });;
}

function emptyDB() {
  Product.deleteMany()
    .then(() => {
      console.log("data deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
        process.exit();
    });
}
if (process.argv[2] === "--import") {
  importDataToDB();
} else if (process.argv[2] === "--delete") {
  emptyDB();
}

mongoose
  .connect(conectionString)
  .then((con) => {
    // console.log("DB connection successful",con);
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

console.log(process.argv);
