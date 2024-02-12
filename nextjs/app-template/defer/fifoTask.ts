import { sleep } from "@/utils/sleep";
import { defer } from "@defer/client";

async function fifoTask() {
  console.log("I am processed in sequence, by calling order");
  await sleep();
}

export default defer(fifoTask, {
  concurrency: 1, // we want this function to run in sequence
});
