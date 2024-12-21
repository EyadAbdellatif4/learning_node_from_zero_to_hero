// ------------------>  using the fs


// const http = require("http");
// const fs = require("fs");


// fs.writeFileSync("./files/text1.txt", "hellow world", (err, data) => {
//   console.log(data);
//   console.log(err);
// });


// const data = fs.readFile("./files/text1.txt", "utf-8", (err, data) => {
  //   //   console.log(data);
  //   //   console.log(err);
  // });
  // console.log(data);
  
  // --------------------> using both fs & http 
  
  
  
  // http.createServer((req, res) => {
    // res.writeHead(200, { "Content-Type": "text/html", "my-header": "hello" });
    // res.write("<h1>hello world</h1>");
    // res.end();
    // }).listen(3000);
    
    // ------------------> using the http



// http
//   .createServer((req, res) => {
//     console.log("server running");
//     // res.writeHead(200, { "Content-Type": "text/html", "my-header": "hello" });
//     // res.write("<h1>hello world</h1>");
//     // res.end();
//     if (req.url === "/") {
//       fs.readFile("./files/text1.txt", "utf-8", (err, data) => {
//         res.writeHead(200, {
//           "Content-Type": "application/json",
//           "my-header": "hello",
//         });
//         res.write(data);
//         res.end();
//       });
//     }
//   })
//   .listen(3000, "127.0.0.1", () => {
//     console.log("server running in port 3000");
//   });
