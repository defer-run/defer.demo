import { defer, init } from "@defer.run/client";
import importContacts from "./importContacts";

init({
  // apiUrl: "http://localhost:8080/api/v1/",
  debug: true,
});

const importContactsWorkflow = async () => {
  return await Promise.all([
    importContacts.await("1", [{ name: "Paul", id: "1" }]),
    importContacts.await("2", [{ name: "Paul", id: "2" }]),
    importContacts.await("3", [{ name: "Paul", id: "3" }]),
    importContacts.await("4", [{ name: "Paul", id: "4" }]),
    importContacts.await("5", [{ name: "Paul", id: "5" }]),
    importContacts.await("6", [{ name: "Paul", id: "6" }]),
    importContacts.await("7", [{ name: "Paul", id: "7" }]),
    importContacts.await("8", [{ name: "Paul", id: "8" }]),
  ]);
};

export default defer(importContactsWorkflow);
