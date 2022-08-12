import type { NextApiRequest, NextApiResponse } from "next";
import sentToIntercom from "../../async/sendToIntercom";

import Cua from "@cuarun/client";

Cua.init({ apiToken: "xxx" }); // <- to be configured

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  sentToIntercom(); // equivalent to `Cua.push('sentToIntercom', {})`
  res.status(200).json({ name: "John Doe" });
}
