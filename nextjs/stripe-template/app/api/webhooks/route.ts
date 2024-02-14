import type { Stripe } from "stripe";

import { NextResponse } from "next/server";
import { assignOptions } from "@defer/client";

import { stripe } from "@/lib/stripe";
import handleStripeEvent from "defer/handleStripeEvent";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      // attach some metadata to the execution
      //  for better filtering in the Defer Console
      const handleStripeEventWithMetadata = assignOptions(handleStripeEvent, {
        metadata: {
          livemode: event.livemode ? "true" : "false",
          type: event.type,
          apiVersion: event.api_version || "",
        },
      });

      // process the event in the background
      await handleStripeEventWithMetadata(event.id);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
