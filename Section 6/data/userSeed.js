// Step 1: Load environment variables from the `.env` file
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// Step 2: Import required modules
const mongoose = require("mongoose"); // For MongoDB connection and operations
const fs = require("fs"); // For reading files from the filesystem
const User = require("../models/user.model"); // Import the User model

// Step 3: Construct the MongoDB connection string
// Replace the placeholder `<db_password>` in the DB connection string with the actual password from environment variables
const conectionString = process.env.DB.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);
console.log(conectionString); // Debugging: Log the connection string

// Step 4: Connect to the MongoDB database
mongoose
  .connect(conectionString)
  .then(() => {
    console.log("DB connection successful"); // Log success message when the connection is established

    // Step 5: Check command-line arguments to determine the action to perform
    if (process.argv[2] === "--import") {
      // If the `--import` argument is provided, import data into the database
      importDataToDB();
    } else if (process.argv[2] === "--delete") {
      // If the `--delete` argument is provided, delete all data from the database
      emptyDB();
    }
  })
  .catch((err) => {
    console.log("DB connection failed:", err); // Log any errors that occur during the connection
    process.exit(1); // Exit the process with an error code
  });

// Step 6: Function to import data from a JSON file into the database
async function importDataToDB() {
  try {
    // Read the JSON file containing the user data
    const usersList = JSON.parse(
      fs.readFileSync(`${__dirname}/users.json`, "utf-8")
    );

    // Insert the user data into the database
    await User.create(usersList);
    console.log("Data imported successfully"); // Log success message
    process.exit(0); // Exit the process with a success code
  } catch (err) {
    console.log("Import failed:", err); // Log any errors that occur during the import
    process.exit(1); // Exit the process with an error code
  }
}

// Step 7: Function to delete all data from the database
async function emptyDB() {
  try {
    // Delete all documents from the User collection
    await User.deleteMany();
    console.log("Data deleted successfully"); // Log success message
    process.exit(0); // Exit the process with a success code
  } catch (err) {
    console.log("Delete failed:", err); // Log any errors that occur during the deletion
    process.exit(1); // Exit the process with an error code
  }
}

// Step 8: Log the command-line arguments for debugging
console.log("Arguments:", process.argv);
