import type { NextApiRequest, NextApiResponse } from "next";
import sendEmails from "../../../background-functions/sendEmails";

type Data = {
  ok: boolean;
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await Promise.all([
    sendEmails.await(),
    sendEmails.await(),
    sendEmails.await(),
    sendEmails.await(),
    sendEmails.await(),
    sendEmails.await(),
    sendEmails.await(),
    sendEmails.await(),
  ]);
  res.status(200).json({ ok: true, result });
}
