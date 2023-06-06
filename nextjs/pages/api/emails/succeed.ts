import { addMetadata } from "@defer/client";
import type { NextApiRequest, NextApiResponse } from "next";
import sendEmailsFn from "../../../defer/sendEmails";

type Data = {
  ok: boolean;
  executionId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sendEmails = addMetadata(sendEmailsFn, { email: 'charly@defer.run' })
  const deferExecution = await sendEmails();
  res.status(200).json({
    ok: true,
    executionId: deferExecution.id,
  });
}
