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
//   res.writeHead(200, { "Content-Type": "text/html", "my-header": "hello" });
//   res.write("<h1>hello world</h1>");
//   res.end();
//   }).listen(3000);

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

/////////////////////////// Section 2 Express.js //////////////////////

// const http = require("http");

// const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log("server running");
// });

// server.listen(3000, "127.0.0.1", () => {
//   console.log("server running in port 3000");
// });

//////////////////// event

// const eventEmitter = require("events");

// const emitter = new eventEmitter();

// emitter.on("hello", () => {
//   console.log("event hits");
// });

// emitter.emit("hello");

// emitter.on("send", (msg) => {
//   console.log(`eyad send you a message ${msg}`);
// });

// emitter.emit("send", "hello");

///////////////////////////// http & emit

// const http = require("http");

// const server = http.createServer();

// server.on("close", () => {
//   console.log("server closed");
// });

// setTimeout(() => {
//   server.close();
// }, 6000);

// server.listen(3000, "127.0.0.1", () => {
//   console.log("server running in port 3000");
// });

/////////////////////////////  Data (Stream)

// const fs = require("fs");
// const http = require("http");

// const server = http.createServer();

// solution one
// server.on("request", (req, res) => {
//   fs.readFile("./files/text1.html", "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//       res.end();
//     } else {
//       res.end(data);
//     }
//   });
// solution two
// const readable = fs.createReadStream("./files/text1.html", "utf-8");
// readable.on("data", (chunk) => {
//   res.write(chunk);
// });
// readable.on("end", () => {
//   res.end();
// });
//solution three
//   const readable = fs.createReadStream("./files/text1.html", "utf-8");
//   readable.pipe(res);
// const writeable = fs.createWriteStream(
//   "./files/text2.html",
//   "utf-8",
//   "hallow"
// );
// writeable.on("drain");
// writeable.on("finish");

// });

// server.listen(3000, "127.0.0.1", () => {
//   console.log("server running in port 3000");
// });


