import { defer, init } from "@defer.run/client";
interface Contact {
  id: string;
  name: string;
}

type EndState = "started" | "succeed" | "failed"

interface DemoOptions {
  endState?: EndState
}

init({
  // apiUrl: "http://localhost:8080/api/v1/",
  debug: true,
});

const importContacts = (companyId: string, contacts: Contact[], options: DemoOptions = {}) => {
  return new Promise<{ imported: number; companyId: string }>((resolve, reject) => {
    console.log(`Start importing contacts for company#${companyId}`);

    setTimeout(() => {
      console.log(contacts);
      switch(options.endState) {
        case "started":
          console.log('Running...')
        case "failed":
          reject(new Error('fail'));
          break;
        case "succeed":
        default:
          console.log("Done.");
          resolve({ imported: 10000, companyId });
          break;
      }
    }, 5000);
  });
};

export default defer(importContacts);
