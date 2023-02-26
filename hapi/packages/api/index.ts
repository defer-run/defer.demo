import Hapi from "@hapi/hapi";

// we import our `helloWorld()` background function
import { helloWorld } from "defer";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/helloWorld",
    handler: async (_request, _h) => {
      // calling a background function triggers an execution on Defer Platform
      await helloWorld("Charly");

      return "Hello World!";
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
