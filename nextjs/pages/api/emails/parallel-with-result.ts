import { awaitResult } from "@defer/client";
import type { NextApiRequest, NextApiResponse } from "next";
import sendEmails from "../../../defer/sendEmails";

type Data = {
  ok: boolean;
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sendEmailsWithResult = awaitResult(sendEmails);
  const result = await Promise.all([
    sendEmailsWithResult(),
    sendEmailsWithResult(),
    sendEmailsWithResult(),
    sendEmailsWithResult(),
    sendEmailsWithResult(),
    sendEmailsWithResult(),
    sendEmailsWithResult(),
    sendEmailsWithResult(),
  ]);
  res.status(200).json({ ok: true, result });
}
