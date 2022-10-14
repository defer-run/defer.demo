import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../background-functions/importContacts";

import cua from '@cua.run/client'

if (process.env.CUA_TOKEN) {
  cua.init({ apiToken: process.env.CUA_TOKEN });
}

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await importContacts('1', [{ name: 'Paul', id: '1' }]); // equivalent to `cua.push('importContact', {})`
  res.status(200).json({ ok: true });
}
