import { isDeferExecution } from "@defer.run/client";
import type { NextApiRequest, NextApiResponse } from "next";
import failingImportContacts from "../../../background-functions/failingImportContacts";

type Data = {
  ok: boolean;
  executionId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const deferExecution = await failingImportContacts("1", [
    { name: "Paul", id: "1" },
  ]);
  res.status(200).json({
    ok: true,
    executionId: isDeferExecution(deferExecution)
      ? deferExecution.id
      : undefined,
  });
}
