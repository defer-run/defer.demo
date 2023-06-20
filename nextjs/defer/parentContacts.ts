import { defer, configure } from "@defer/client";
import importContacts from "./importContacts";
interface Contact {
  id: string;
  name: string;
}

type State = "started" | "succeed" | "failed";

interface DemoOptions {
  endState?: State;
  duration?: number;
}

configure({
  verbose: true,
});

const parentContacts = (
  companyId: string,
  contacts: Contact[],
  options: DemoOptions = {}
) => {
  return new Promise<{ imported: number; companyId: string }>(
    (resolve, reject) => {
      let interval = options.duration || 5000;
      console.log(`Start importing contacts for company#${companyId}`);

      if (options.endState && options.endState === "started") interval = 300000;

      setTimeout(() => {
        console.log(contacts);
        switch (options.endState) {
          case "failed":
            reject(new Error("fail"));
            break;
          case "succeed":
          default:
            importContacts(companyId, contacts, options);
            console.log("Done.");
            resolve({ imported: 10000, companyId });
            break;
        }
      }, interval);
    }
  );
};

export default defer(parentContacts, { concurrency: 10 });
