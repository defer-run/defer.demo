import { defer, init } from "@defer.run/client";

interface Contact {
  id: string;
  name: string;
}

init({
  // apiUrl: "http://localhost:8080/api/v1/",
  debug: true,
});

const importContacts = (companyId: string, contacts: Contact[]) => {
  return new Promise<{ imported: number; companyId: string }>((resolve) => {
    console.log(`Start importing contacts for company#${companyId}`);
    setTimeout(() => {
      console.log(contacts);
      console.log("Done.");
      resolve({ imported: 10000, companyId });
    }, 5000);
  });
};

export default defer(importContacts);
