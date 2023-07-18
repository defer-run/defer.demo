import { cancelExecution, delay } from "@defer/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await cancelExecution(req.query.executionID! as string);
  res.status(200).json({ ok: true });
}
