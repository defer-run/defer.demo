import { defer } from "@defer.run/client";
interface Contact {
  id: string;
  name: string;
}

const importContacts = (companyId: string, contacts: Contact[]) => {
  return new Promise((resolve) => {
    console.log(`Start importing contacts for company#${companyId}`);
    setTimeout(() => {
      console.log(contacts);
      console.log("Done.");
      resolve({ imported: 10000 });
    }, 5000);
  });
};

export default defer(importContacts);
