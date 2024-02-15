import { assignOptions, defer } from "@defer/client";
import sendMonthlyUsageEmail from "./sendMonthlyUsageEmail";

async function sendMonthlyUsage() {
  const userIds = ["1"]; // replace with a proper database request

  // we parallelize the sending of emails to avoid
  //  CRON overlapping over time
  for (let userId of userIds) {
    // we attach userId to each execution for easier filtering
    //  from the Defer Console
    const sendMonthlyUsageEmailWithMetadata = assignOptions(
      sendMonthlyUsageEmail,
      {
        metadata: { userId },
      }
    );
    await sendMonthlyUsageEmailWithMetadata(userId);
  }
}

export default defer.cron(sendMonthlyUsage, "0 0 1 * *");
