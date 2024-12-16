const fs = require("fs");

fs.writeFileSync("./files/text1.txt", "hellow world", (err, data) => {
  console.log(data);
  console.log(err);
});

const data = fs.readFile("./files/text1.txt", "utf-8", (err, data) => {
//   console.log(data);
//   console.log(err);
});
console.log(data);
