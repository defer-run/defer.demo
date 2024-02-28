import { defer } from "@defer/client";

import { Step, sleep } from "@/utils/workflow";
import workflow from "../workflow";

// Trigger 1000 workflows with a random distribution in time
async function triggerUserEvents(workflowID: string, steps: Step[]) {
  let events = 1000;
  while (events > 0) {
    let num = Math.floor(Math.random() * 100) + 1;
    events -= num;
    if (events < 0) {
      num += events;
    }

    await sleep(Math.floor(Math.random() * 1000) + 1);

    for (let index = 0; index < num; index++) {
      await workflow(workflowID, steps);
    }
  }
}

export default defer(triggerUserEvents);
