import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../background-functions/importContacts";

type Data = {
  ok: boolean;
  executionId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const deferExecution = await importContacts("1", [
    { name: "Paul", id: "1" },
  ], { endState: "started" });
  res.status(200).json({
    ok: true,
    executionId: deferExecution.id
  });
}
