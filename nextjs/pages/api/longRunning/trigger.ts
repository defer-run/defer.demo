import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../defer/importContacts";

type Data = {
  id: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ret = await importContacts("1", []);
  res.status(200).json(ret);
}
