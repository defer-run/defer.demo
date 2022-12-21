import type { NextApiRequest, NextApiResponse } from "next";
import importContactsWorkflow from "../../../background-functions/importContactsWorkflow";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await importContactsWorkflow();
  res.status(200).json({ ok: true });
}
