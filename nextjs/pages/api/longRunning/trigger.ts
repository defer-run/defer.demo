import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../defer/importContacts";

type Data = {
  id: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // run a function for 90s
  const ret = await importContacts("1", [], { duration: 90000 });
  res.status(200).json(ret);
}
