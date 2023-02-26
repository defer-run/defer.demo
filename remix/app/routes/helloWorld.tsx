import type { LoaderArgs } from "@remix-run/node";
import helloWorld from "~/defer/helloWorld";

export async function loader({ params }: LoaderArgs) {
  await helloWorld();
  return new Response("OK.", {
    status: 200,
  });
}
