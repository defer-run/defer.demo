import type { NextApiRequest, NextApiResponse } from "next";
import importParentContacts from "../../../defer/parentContacts";

type Data = {
  ok: boolean;
  executionId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const deferExecution = await importParentContacts("1", [
    { name: "Paul", id: "1" },
  ]);
  res.status(200).json({
    ok: true,
    executionId: deferExecution.id,
  });
}
