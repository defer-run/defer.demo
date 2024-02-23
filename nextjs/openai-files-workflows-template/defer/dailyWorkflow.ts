import { defer } from "@defer/client";
import { createAudioChunks } from "./createAudioChunks";

async function dailyWorkflow() {
  const ids = ["1"];
  for (const id of ids) {
    await createAudioChunks(id);
  }
}

export default defer.cron(dailyWorkflow, "0 8 * * *");
