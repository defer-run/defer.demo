import { delay } from "@defer.run/client";
import type { NextApiRequest, NextApiResponse } from "next";
import sendEmails from "../../../background-functions/sendEmails";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const delayedSendEmails = delay(sendEmails, "1h")
  await delayedSendEmails()
  res.status(200).json({ ok: true });
}
