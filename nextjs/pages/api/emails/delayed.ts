import type { NextApiRequest, NextApiResponse } from "next";
import sendEmails from "../../../background-functions/sendEmails";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await sendEmails.delayed(undefined, { delay: "1h" });
  res.status(200).json({ ok: true });
}
