const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("../models/user.model");
dotenv.config({ path: ".env" });

const conectionString = process.env.DB.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

// Connect to DB first before running operations
mongoose
  .connect(conectionString)
  .then(() => {
    console.log("DB connection successful");

    // Only run operations after successful connection
    if (process.argv[2] === "--import") {
      importDataToDB();
    } else if (process.argv[2] === "--delete") {
      emptyDB();
    }
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
    process.exit(1);
  });

async function importDataToDB() {
  try {
    const usersList = JSON.parse(
      fs.readFileSync(`${__dirname}/users.json`, "utf-8")
    );
    await User.create(usersList);
    console.log("Data imported successfully");
    process.exit(0);
  } catch (err) {
    console.log("Import failed:", err);
    process.exit(1);
  }
}

async function emptyDB() {
  try {
    await User.deleteMany();
    console.log("Data deleted successfully");
    process.exit(0);
  } catch (err) {
    console.log("Delete failed:", err);
    process.exit(1);
  }
}

console.log("Arguments:", process.argv);
