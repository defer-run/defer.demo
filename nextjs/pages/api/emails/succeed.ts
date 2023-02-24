import { isDeferExecution } from "@defer.run/client";
import type { NextApiRequest, NextApiResponse } from "next";
import sendEmails from "../../../background-functions/sendEmails";

type Data = {
  ok: boolean;
  executionId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const deferExecution = await sendEmails();
  res.status(200).json({
    ok: true,
    executionId: isDeferExecution(deferExecution)
      ? deferExecution.id
      : undefined,
  });
}