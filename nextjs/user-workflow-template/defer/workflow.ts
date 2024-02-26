import {
  DeferredFunction,
  ExecutionOptions,
  assignOptions,
  defer,
} from "@defer/client";
import wait from "./actions/wait";
import log from "./actions/log";

type Action = "sendMail" | "updateUser" | "wait" | "log";

interface Step {
  action: Action;
  args: any;
}

export type ActionStep = Step & { next?: ActionStep; workflowID: string };

export type ActionFunction = (
  ...args: [ActionStep | undefined, ...any]
) => Promise<any>;

function stepsToTree(steps: Step[], workflowID: string): ActionStep {
  const tree: ActionStep = { ...steps[0], workflowID };
  let ptr = tree;
  for (const step of steps) {
    ptr.next = step as any;
    ptr.workflowID = workflowID;
    ptr = ptr.next as any;
  }
  return tree;
}

export const actionsToFn: { [k in Action]: DeferredFunction<ActionFunction> } =
  {
    wait,
    log,
    sendMail: null as any,
    updateUser: null as any,
  };

export async function invokeNextStep(
  current: ActionStep,
  options: ExecutionOptions = {}
) {
  if (current.next) {
    const next = actionsToFn[current.next.action];
    const fn = assignOptions(next, options);
    await fn(...stepToCallable(current.next));
  }
}

export const stepToCallable = (
  step: ActionStep
): Parameters<ActionFunction> => [step, ...step.args];

async function workflow(id: string, steps: Step[]) {
  const firstStep = steps[0];
  const fn = actionsToFn[firstStep.action];
  const stepsTree = stepsToTree(steps, id);

  console.log("workflow", stepsTree);

  await fn(...stepToCallable(stepsTree));
}

export default defer(workflow);
