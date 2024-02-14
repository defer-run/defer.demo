import { defer } from "@defer/client";
import Stripe from "stripe";

// this Background Function processes Stripe events with:
//  - `retries` for resilient processing of events
//  - `concurrency` to avoid external rate limiting during spikes
async function handleStripeEvent(eventID: string) {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY!);
  const event = await stripe.events.retrieve(eventID);
  switch (event.type) {
    case "customer.created":
      break;
    case "customer.deleted":
      break;
    default:
      console.log(`skip ${eventID} event`);
  }
}

export default defer(handleStripeEvent, {
  retry: 7, // enable retries with a exponential back-off strategy
  concurrency: 5,
});
