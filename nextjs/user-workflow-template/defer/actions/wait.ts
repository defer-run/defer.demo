import { assignOptions, defer } from "@defer/client";
import { ActionFunction, invokeNextStep } from "@/utils/workflow";

const wait: ActionFunction = async (
  step,
  seconds: number,
  scheduleOnly = true
) => {
  if (scheduleOnly) {
    const self = assignOptions(deferredWait, {
      delay: `${seconds}s`,
      metadata: { workflowID: step?.workflowID! },
    });
    await self(step, seconds, false);
  } else {
    await invokeNextStep(step!);
  }
};

const deferredWait = defer(wait, { concurrency: 100 });
export default deferredWait;
