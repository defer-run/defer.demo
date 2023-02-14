import { defer, init } from "@defer.run/client";

type EndState = "started" | "succeed" | "failed"

interface DemoOptions {
  endState?: EndState
}

init({
  // apiUrl: "http://localhost:8080/api/v1/",
  debug: true,
});

const sendEmails = (options: DemoOptions = {}) => {
  return new Promise<{ sent: number }>((resolve, reject) => {
    console.log("Start sending emails");

    setTimeout(() => {
      switch(options.endState) {
        case "started":
          console.log('Running...')
        case "failed":
          reject(new Error('fail'));
          break;
        case "succeed":
        default:
          console.log("Done.");
          resolve({ sent: 10000 });
          break;
      }
    }, 5000);
  });
};

export default defer(sendEmails);
