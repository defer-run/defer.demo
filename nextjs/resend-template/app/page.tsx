"use client";
import { useCallback } from "react";
import Image from "next/image";

import { sendEmail } from "./actions/actions";

import logo from "./logo.png";
import emailPreview from "./email-preview.png";

export default function Index() {
  const triggerSendEmail = useCallback(() => sendEmail(), [sendEmail]);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Image src={logo} alt={"Defer"} className="flex-1 max-w-24" />
          <a
            className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fresend-template%2F&project-name=nextjs-with-defer-resend&repository-name=nextjs-with-defer-resend&demo-title=nextjs-with-defer-resend&demo-description=Schedule%20or%20offload%20the%20sending%20of%20rich%20emails%20with%20Resend.&demo-url=https%3A%2F%2Fdemo-nextjs-with-defer-resend.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fresend-template%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fdefer-run%2Fdefer.demo%2Fmaster%2Fnextjs%2Fresend-template%2Fapp%2Fog_image.png&integration-ids="
            target="_blank"
            rel="noreferrer"
          >
            <svg
              aria-label="Vercel logomark"
              role="img"
              viewBox="0 0 74 64"
              className="h-4 w-4 mr-2"
            >
              <path
                d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
                fill="currentColor"
              ></path>
            </svg>
            Deploy to Vercel
          </a>
        </div>
      </nav>

      <div className="flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex flex-col gap-4 justify-evenly">
          <div className="py-2 px-3 rounded-md border flex gap-6 flex-col">
            <div>
              <h2 className="text-xl font-bold">Defer x Resend</h2>
              <p>
                Offload or schedule the sending of emails to Defer while
                benefiting from Resend rich emails.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="py-1 px-2 bg-black text-white flex rounded-md no-underline hover:bg-gray-800 border"
                onClick={triggerSendEmail}
              >
                Send email
              </button>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src={emailPreview}
              alt={"Email preview"}
              className="flex-1 w-full"
            />
          </div>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Explore the{" "}
          <a
            href="https://www.defer.run/docs/introduction"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Defer documentation
          </a>
        </p>
      </footer>
    </div>
  );
}
