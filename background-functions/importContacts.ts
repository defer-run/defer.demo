import { init, defer } from "@defer.run/client";

init({
  apiUrl: process.env.DEFER_API,
});

interface Contact {
  id: string;
  name: string;
}

const importContacts = (
  companyId: string,
  contacts: Contact[]
): Promise<void> => {
  return new Promise((resolve) => {
    console.log(`Start importing contacts for company#${companyId}`);
    console.log("NODE_ENV", process.env.NODE_ENV);
    console.log("MY_ENV_VAR", process.env.MY_ENV_VAR);
    setTimeout(() => {
      console.log(contacts);
      console.log("Done.");
      resolve();
    }, 5000);
  });
};

export default defer(importContacts);
