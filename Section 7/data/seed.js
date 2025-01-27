// Step 1: Load environment variables from the `.env` file
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// Step 2: Import required modules
const mongoose = require("mongoose"); // For MongoDB connection and operations
const fs = require("fs"); // For reading files from the filesystem
const Product = require("../models/product.model"); // Import the Product model

// Step 3: Construct the MongoDB connection string
// Replace the placeholder `<db_password>` in the DB connection string with the actual password from environment variables
const conectionString = process.env.DB.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);
console.log(conectionString); // Debugging: Log the connection string

// Step 4: Function to import data from a JSON file into the database
function importDataToDB() {
  // Read the JSON file containing the product data
  const ProductsList = JSON.parse(
    fs.readFileSync(`${__dirname}/products.json`, "utf-8")
  );

  // Step 5: Insert the product data into the database
  Product.create(ProductsList)
    .then((res) => {
      console.log("Data imported successfully"); // Log success message
    })
    .catch((err) => {
      console.log(err); // Log any errors that occur during the import
    })
    .finally(() => {
      process.exit(); // Exit the process after the operation is complete
    });
}

// Step 6: Function to delete all data from the database
function emptyDB() {
  // Delete all documents from the Product collection
  Product.deleteMany()
    .then(() => {
      console.log("Data deleted successfully"); // Log success message
    })
    .catch((err) => {
      console.log(err); // Log any errors that occur during the deletion
    })
    .finally(() => {
      process.exit(); // Exit the process after the operation is complete
    });
}

// Step 7: Check command-line arguments to determine the action to perform
if (process.argv[2] === "--import") {
  // If the `--import` argument is provided, import data into the database
  importDataToDB();
} else if (process.argv[2] === "--delete") {
  // If the `--delete` argument is provided, delete all data from the database
  emptyDB();
}

// Step 8: Connect to the MongoDB database
mongoose
  .connect(conectionString)
  .then((con) => {
    // Log a success message when the connection is established
    console.log("DB connection successful");
  })
  .catch((err) => {
    // Log any errors that occur during the connection
    console.log(err);
  });

// Step 9: Log the command-line arguments for debugging
console.log(process.argv);
