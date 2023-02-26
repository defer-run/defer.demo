import { defer } from "@defer/client";

const helloWorld = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Hello World!`);
      resolve("done");
    }, 5000);
  });

export default defer(helloWorld);
