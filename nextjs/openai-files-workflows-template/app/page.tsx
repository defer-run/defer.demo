"use client";

import Image from "next/image";

import logo from "./logo.png";
import workflowPreview from "./workflow.png";

export default function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Image src={logo} alt={"Defer"} className="flex-1 max-w-24" />
        </div>
      </nav>

      <div className="flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex flex-col gap-4 justify-evenly">
          <div className="py-2 px-3 rounded-md border flex gap-6 flex-col">
            <h2 className="text-xl font-bold mb-2">
              Large video speech-to-text with OpenAI Whisper and Defer
            </h2>
            <Image
              src={workflowPreview}
              alt={"Workflow preview"}
              className="flex-1 w-full"
            />
            <div className="flex justify-center mb-2">
              <div className="flex flex-row">
                <a
                  className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
                  href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fopenai-files-workflows-template%2F&project-name=nextjs-with-defer-openai&repository-name=nextjs-with-defer-openai&demo-title=nextjs-with-defer-openai&demo-description=Leverage%20Defer%20using%20GitHub%20data%20as%20a%20prompt%20for%20OpenAI%20completion%20API.&demo-url=https%3A%2F%2Fnextjs-with-defer-openai.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fopenai-files-workflows-template%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fdefer-run%2Fdefer.demo%2Fmaster%2Fnextjs%2Fopenai-files-workflows-template%2Fapp%2Fog_image.png&integration-ids="
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
                  Deploy to Vercel to test this demo
                </a>
              </div>
            </div>
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
