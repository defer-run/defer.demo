import { defer, init } from "@defer.run/client";
interface Contact {
  id: string;
  name: string;
}

init({
  apiUrl: "http://172.16.2.1:8080/api/v1/",
  debug: true,
});

const importContactsEveryDay = () => {
  return new Promise<{ imported: number }>((resolve) => {
    console.log("start importing contacts");
    setTimeout(() => {
      console.log("Done.");
      resolve({ imported: 10000 });
    }, 5000);
  });
};

export default defer.schedule(importContactsEveryDay, "every 15 minutes");
