import type { NextApiRequest, NextApiResponse } from "next";
import importContacts from "../../../background-functions/importContacts";

type Data = {
  ok: boolean;
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await Promise.all([
    importContacts.await("1", [{ name: "Paul", id: "1" }]),
    importContacts.await("2", [{ name: "Paul", id: "2" }]),
    importContacts.await("3", [{ name: "Paul", id: "3" }]),
    importContacts.await("4", [{ name: "Paul", id: "4" }]),
    importContacts.await("5", [{ name: "Paul", id: "5" }]),
    importContacts.await("6", [{ name: "Paul", id: "6" }]),
    importContacts.await("7", [{ name: "Paul", id: "7" }]),
    importContacts.await("8", [{ name: "Paul", id: "8" }]),
  ]);
  res.status(200).json({ ok: true, result });
}
