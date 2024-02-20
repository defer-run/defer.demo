"use client";
import { FormEventHandler, useCallback, useState } from "react";
import Image from "next/image";

import { useDeferRoute } from "@defer/client/next";
import generateGitHubProfile from "@/defer/generateGitHubProfile";

import logo from "./logo.png";

export default function Index() {
  // trigger our Defer function from our Client Component
  const [generate, { loading, result }] =
    useDeferRoute<typeof generateGitHubProfile>("/api/githubProfile");

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const formElements = e.currentTarget
        .elements as typeof e.currentTarget.elements & {
        ghusername: { value: string };
      };
      await generate(formElements.ghusername.value);
    },
    [generate]
  );

  const [copied, updateCopied] = useState(false);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(result!);
    updateCopied(true);
    setTimeout(() => updateCopied(false), 1000);
  }, [result]);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Image src={logo} alt={"Defer"} className="flex-1 max-w-24" />
          <a
            className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fopenai-template%2F&project-name=nextjs-with-defer-openai&repository-name=nextjs-with-defer-openai&demo-title=nextjs-with-defer-openai&demo-description=Leverage%20Defer%20using%20GitHub%20data%20as%20a%20prompt%20for%20OpenAI%20completion%20API.&demo-url=https%3A%2F%2Fnextjs-with-defer-openai.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fopenai-template%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fdefer-run%2Fdefer.demo%2Fmaster%2Fnextjs%2Fopenai-template%2Fapp%2Fog_image.png&integration-ids="
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
            <form onSubmit={onSubmit}>
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Get a personalized GitHub profile README
                </h2>
                <p>
                  <input className="input" type="text" name="ghusername" />
                </p>
              </div>
              <div className="flex justify-end">
                <input
                  type="submit"
                  disabled={loading}
                  className="py-1 px-2 bg-black text-white flex rounded-md no-underline hover:bg-gray-800 border"
                  value={loading ? "Generating..." : "Generate"}
                />
              </div>
            </form>
          </div>
          <div className="flex-1">
            {result && (
              <div className="codeblock-container">
                <div
                  className="buttonTertiary codeblock-copy-btn"
                  onClick={onCopy}
                >
                  <div>{copied ? "Copied!" : "Copy"}</div>
                </div>
                <div className="codeblock-content">{result}</div>
              </div>
            )}
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
