"use server";

import sendMonthlyUsage from "@/defer/sendMonthlyUsage";

// Next.js Server Actions are perfect way to trigger Defer Background functions
//  from Client-Side Components

export async function sendEmail() {
  return await sendMonthlyUsage();
}
