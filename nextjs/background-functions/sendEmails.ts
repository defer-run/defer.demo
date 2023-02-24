import { defer, init } from "@defer.run/client";

type State = "started" | "succeed" | "failed"

interface DemoOptions {
  endState?: State
}

init({
  // apiUrl: "http://localhost:8080/api/v1/",
  debug: true,
});

const sendEmails = (options: DemoOptions = {}) => {
  return new Promise<{ sent: number }>((resolve, reject) => {
    let interval = 5000
    console.log("Start sending emails");

    if (options.endState && options.endState === 'started') interval = 300000

    setTimeout(() => {
      switch(options.endState) {
        case "failed":
          reject(new Error('fail'));
          break;
        case "succeed":
        default:
          console.log("Done.");
          resolve({ sent: 10000 });
          break;
      }
    }, interval);
  });
};

export default defer(sendEmails);