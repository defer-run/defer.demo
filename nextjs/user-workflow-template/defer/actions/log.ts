import { defer } from "@defer/client";
import { ActionFunction, invokeNextStep } from "../workflow";

const log: ActionFunction = async (step, msg: string) => {
  console.log(msg);

  await invokeNextStep(step!);
};

export default defer(log);
