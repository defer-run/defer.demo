import http from "http";
import helloWorld from "./defer/helloWorld.js";

http
  .createServer(async function (req, res) {
    await helloWorld();
    res.write("Hello World!");
    res.end();
  })
  .listen(3000);
