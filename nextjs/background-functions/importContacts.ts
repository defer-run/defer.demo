import { defer, configure } from "@defer.run/client";
interface Contact {
  id: string;
  name: string;
}

type State = "started" | "succeed" | "failed"

interface DemoOptions {
  endState?: State
}

configure({
  endpoint: "http://localhost:8080/api/v1/",
  verbose: true,
});

const importContacts = (companyId: string, contacts: Contact[], options: DemoOptions = {}) => {
  return new Promise<{ imported: number; companyId: string }>((resolve, reject) => {
    let interval = 5000
    console.log(`Start importing contacts for company#${companyId}`);

    if (options.endState && options.endState === 'started') interval = 300000

    setTimeout(() => {
      console.log(contacts);
      switch(options.endState) {
        case "failed":
          reject(new Error('fail'));
          break;
        case "succeed":
        default:
          console.log("Done.");
          resolve({ imported: 10000, companyId });
          break;
      }
    }, interval);
  });
};

export default defer(importContacts);
