import { defer } from "@defer/client";
import { ActionFunction, invokeNextStep } from "../workflow";

type Seconds = number;

const wait: ActionFunction = async (step, time: Seconds) => {
  await invokeNextStep(step!, { delay: `${time}s` });
};

export default defer(wait);
