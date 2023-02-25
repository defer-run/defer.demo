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
  const deferExecution = await sendEmails({ endState: "failed" });
  res.status(200).json({
    ok: true,
    executionId: deferExecution.id,
  });
}
