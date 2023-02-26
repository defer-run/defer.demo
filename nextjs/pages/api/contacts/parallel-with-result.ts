import { awaitResult } from "@defer/client";
import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../defer/importContacts";

type Data = {
  ok: boolean;
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const importContactsWithResult = awaitResult(importContacts);

  const result = await Promise.all([
    importContactsWithResult("1", [{ name: "Paul", id: "1" }]),
    importContactsWithResult("2", [{ name: "Paul", id: "2" }], {
      // endState: "failed",
    }),
    importContactsWithResult("3", [{ name: "Paul", id: "3" }]),
    importContactsWithResult("4", [{ name: "Paul", id: "4" }]),
    importContactsWithResult("5", [{ name: "Paul", id: "5" }]),
    importContactsWithResult("6", [{ name: "Paul", id: "6" }]),
    importContactsWithResult("7", [{ name: "Paul", id: "7" }]),
    importContactsWithResult("8", [{ name: "Paul", id: "8" }]),
  ]);
  res.status(200).json({ ok: true, result });
}
