import { delay } from "@defer.run/client";
import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../background-functions/importContacts";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const delayedImportContacts = delay(importContacts, "1d")
  await delayedImportContacts("1", []);
  res.status(200).json({ ok: true });
}
