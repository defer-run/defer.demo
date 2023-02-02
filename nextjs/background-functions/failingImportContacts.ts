import { defer, init } from "@defer.run/client";
interface Contact {
  id: string;
  name: string;
}

init({
  apiUrl: "http://localhost:8080/api/v1/",
  debug: true,
});

const failingImportContacts = (companyId: string, contacts: Contact[]) => {
  return new Promise<{ imported: number; companyId: string }>((resolve, reject) => {
    console.log(`Start importing contacts for company#${companyId}`);
    setTimeout(() => {
      reject(new Error('fail'));
    }, 5000);
  });
};

export default defer(failingImportContacts);
