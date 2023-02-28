import { defer } from "@defer/client";
import { env } from "../env/server.mjs";

const helloWorld = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(env.NODE_ENV);
      console.log(`Hello World!`);
      resolve("done");
    }, 5000);
  });

export default defer(helloWorld);
