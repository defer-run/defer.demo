import {
  DeferredFunction,
  ExecutionOptions,
  assignOptions,
} from "@defer/client";

import sendNotification from "@/defer/actions/sendNotification";
import wait from "@/defer/actions/wait";

export type Action = "sendMail" | "updateUser" | "wait" | "sendNotification";

export interface Step {
  action: Action;
  args: any;
}

export type ActionStep = Step & {
  next?: ActionStep;
  workflowID: string;
  stepIdx?: number;
};

export type ActionFunction = (
  ...args: [ActionStep | undefined, ...any]
) => Promise<any>;

export const actionsToFn: {
  [k in Action]: DeferredFunction<ActionFunction>;
} = {
  wait,
  sendNotification,
  sendMail: null as any,
  updateUser: null as any,
};

// Transform a list of Steps into a LinkedList that is passed from step to step
export function stepsToTree(steps: Step[], workflowID: string): ActionStep {
  const tree: ActionStep = { ...steps[0], workflowID, stepIdx: 0 };
  let ptr = tree;
  for (let idx = 1; idx < steps.length; idx++) {
    ptr.next = steps[idx] as any;
    ptr.next!.stepIdx = idx;
    ptr.next!.workflowID = workflowID;
    ptr = ptr.next as any;
  }
  return tree;
}

export async function invokeStep(
  step: ActionStep,
  options: ExecutionOptions = {}
) {
  const fn = assignOptions(actionsToFn[step.action], {
    ...options,
    metadata: {
      stepId: `${step.workflowID!}-${step.stepIdx!.toString()}`,
    },
  });
  await fn(...stepToCallable(step));
}
export async function invokeNextStep(
  current: ActionStep,
  options: ExecutionOptions = {}
) {
  if (current.next) {
    await invokeStep(current.next, options);
  }
}

export const stepToCallable = (
  step: ActionStep
): Parameters<ActionFunction> => [step, ...step.args];
export function broofa() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 3) | 8;
    return v.toString(16);
  });
}
export async function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
