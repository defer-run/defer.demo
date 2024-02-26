import workflow from "./defer/workflow";

(async function main() {
  await workflow("1", [
    { action: "wait", args: [1] },
    { action: "log", args: ["coucou 1"] },
    { action: "wait", args: [2] },
    { action: "log", args: ["coucou 2"] },
    { action: "wait", args: [3] },
    { action: "log", args: ["coucou 3"] },
  ]);
})();
