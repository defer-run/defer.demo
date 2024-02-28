"use server";

import { listExecutions } from "@defer/client";
import triggerUserEvents from "@/defer/triggers/userEvents";
import { Step } from "@/utils/workflow";

// Next.js Server Actions are perfect way to trigger Defer Background functions
//  from Client-Side Components

export async function runWorkflow(workflowID: string, steps: Step[]) {
  await triggerUserEvents(workflowID, steps);
}

export async function listStepsStatus(workflowID: string, steps: Step[]) {
  return await Promise.all(
    steps.map(({}, idx) => {
      return listExecutions(
        { first: 1000 },
        {
          metadata: [
            {
              key: "stepId",
              values: [`${workflowID}-${idx.toString()}`],
            },
          ],
          states: ["succeed"],
        }
      );
    })
  );
}
