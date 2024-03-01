import { defer } from "@defer/client";

import { invokeStep, stepsToTree } from "@/utils/workflow";
import { Step } from "@/utils/workflow";

async function workflow(id: string, steps: Step[]) {
  const stepsTree = stepsToTree(steps, id);

  await invokeStep(stepsTree);
}

export default defer(workflow, { concurrency: 100 });
