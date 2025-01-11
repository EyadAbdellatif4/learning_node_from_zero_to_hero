const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

// console.log(process.env.hallow);
// console.log(process.env.PORT);

const conectionString = process.env.DB.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);
console.log(conectionString);
mongoose
  .connect(conectionString)
  .then((con) => {
    // console.log("DB connection successful",con);
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
