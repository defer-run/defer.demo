import Koa from "koa";

// we import our `helloWorld()` background function
import helloWorld from "defer/helloWorld";

const app = new Koa();

app.use(async (ctx) => {
  // calling a background function triggers an execution on Defer Platform
  await helloWorld("Charly");

  ctx.body = "Hello World";
});

app.listen(3000);
