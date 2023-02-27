import { defer } from "@defer/client";
import { now } from "utils/now";

const helloWorld = (name: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Hello ${name}, ${now()}`);
      resolve("done");
    }, 5000);
  });

export default defer(helloWorld);
