import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../background-functions/importContacts";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await importContacts('1', [{ name: 'Paul', id: '1' }]);
  res.status(200).json({ ok: true });
}
