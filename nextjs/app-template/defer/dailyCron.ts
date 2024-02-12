import { defer } from "@defer/client";

async function dailyCron() {
  console.log("I run everyday at 8am UTC!");
}

export default defer.cron(dailyCron, "0 8 * * *", { concurrency: 10 });
