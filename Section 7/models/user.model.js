// Step 1: Import Mongoose for MongoDB schema and model creation
const mongoose = require("mongoose");

// Step 2: Define the schema for the User collection
const userSchema = new mongoose.Schema({
  // Step 3: Define the `address` field
  address: {
    type: Object, // Data type is Object (can store nested key-value pairs)
  },

  // Step 4: Define the `email` field
  email: {
    type: String, // Data type is String
    required: [true, "Email is required"], // Field is required, with a custom error message
    unique: true, // Ensures that no two users can have the same email
  },

  // Step 5: Define the `username` field
  username: {
    type: String, // Data type is String
    required: [true, "Username is required"], // Field is required, with a custom error message
    unique: true, // Ensures that no two users can have the same username
  },

  // Step 6: Define the `password` field
  password: {
    type: String, // Data type is String
    required: [true, "Password is required"], // Field is required, with a custom error message
  },

  // Step 7: Define the `name` field as a nested object
  name: {
    firstname: {
      type: String, // Data type is String
      required: [true, "First name is required"], // Field is required, with a custom error message
    },
    lastname: {
      type: String, // Data type is String
      required: [true, "Last name is required"], // Field is required, with a custom error message
    },
  },

  // Step 8: Define the `phone` field
  phone: {
    type: String, // Data type is String
    required: [true, "Phone number is required"], // Field is required, with a custom error message
    unique: true, // Ensures that no two users can have the same phone number
  },
});

// Step 9: Create the User model from the schema
// The model represents a collection in the MongoDB database
const User = mongoose.model("User", userSchema);

// Step 10: Export the User model for use in other parts of the application
module.exports = User;
