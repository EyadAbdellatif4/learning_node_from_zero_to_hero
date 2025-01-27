// Step 1: Import required modules
const app = require("./app"); // Import the Express application
const dotenv = require("dotenv"); // Import dotenv to load environment variables
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection

// Step 2: Load environment variables from the `.env` file
dotenv.config({ path: "./.env" });

// Step 3: Define the port for the server to listen on
// Use the PORT environment variable if available, otherwise default to 3000
const port = process.env.PORT || 3000;

// Step 4: Construct the MongoDB connection string
// Replace the placeholder `<db_password>` in the DB connection string with the actual password from environment variables
const conectionString = process.env.DB.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);
console.log(conectionString); // Debugging: Log the connection string

// Step 5: Connect to the MongoDB database
mongoose
  .connect(conectionString)
  .then((con) => {
    console.log("DB connection successful"); // Log success message when the connection is established
  })
  .catch((err) => {
    console.log(err); // Log any errors that occur during the connection
  });

// Step 6: Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log a message when the server starts successfully
});
