import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../background-functions/importContacts";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await importContacts.delayed("1", [], { delay: "1h" });
  res.status(200).json({ ok: true });
}
