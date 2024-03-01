import { defer } from "@defer/client";
import { ActionFunction, invokeNextStep, sleep } from "@/utils/workflow";

const sendNotification: ActionFunction = async (step) => {
  // simulate sending an email with Resend
  await sleep(1);

  await invokeNextStep(step!);
};

export default defer(sendNotification, {
  // setup concurrency to match Resend's rate limiting:
  //  https://resend.com/docs/api-reference/introduction#rate-limit
  concurrency: 8,
  // enable retries in case of network or reliability issues
  retry: 5,
});
