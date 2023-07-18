import { delay } from "@defer/client";
import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../defer/importContacts";

type Data = {
  ok: boolean;
  executionId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const delayedImportContacts = delay(importContacts, "1d");
  const { id } = await delayedImportContacts("1", []);
  res.status(200).json({ ok: true, executionId: id });
}
