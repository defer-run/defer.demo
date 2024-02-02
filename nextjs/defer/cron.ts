import { defer } from "@defer/client";
import parentContacts from "./parentContacts";

export default defer.cron(async function cron() {
  console.log("hello cron");

  const res = await parentContacts("id", []);
  console.log(res);
}, "* * * * *");
