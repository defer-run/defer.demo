![Build no code experiences with Defer](./app/og_image.png)

<p align="center">
 Leverage Defer's Epoque Scheduler API to build no-code experiences
</p>

<p align="center">
    <a href="https://docs.defer.run/">Documentation</a>
    <span>&nbsp;·&nbsp;</span>
    <a href="https://www.defer.run/blog">Blog</a>
    <span>&nbsp;·&nbsp;</span>
    <a href="https://discord.gg/x2v84Vqsk6">Community</a>
    <span>&nbsp;·&nbsp;</span>
    <a href="https://github.com/defer-run/defer.client/discussions/categories/roadmap">Roadmap / RFCs</a>
</p>
<br/>

## Overview

Building a Workflow Builder UI is a whole product inside a product, with complexity from the front-end (drag-and-drop, complex local states) conception to the back-end
and infrastructure required to run the workflows (scheduling capabilities, compute scaling, reliability).

<br />

This demo leverages the [`@defer/client/next`](https://www.defer.run/blog/defer-vercel) integration to integrate the Workflow steps,
as [Defer Background Functions](./defer/workflow.ts), directly from the Next.js Client Components, leveraging [Next.js Server Actions](./app/actions/actions.ts).

<br />

## Deploy to Vercel

1. First, click on the following button will fork this demo repository and deploy it on your Vercel account: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fuser-workflow-template%2F&project-name=nextjs-workflow-builder-with-defer&repository-name=nextjs-workflow-builder-with-defer&demo-title=nextjs-workflow-builder-with-defer&demo-description=A%20User%20Notification%20Builder%20built%20with%20Defer&demo-url=https%3A%2F%2Fnextjs-workflow-builder-with-defer.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fuser-workflow-template%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fdefer-run%2Fdefer.demo%2Fmaster%2Fnextjs%2Fuser-workflow-template%2Fapp%2Fog_image.png&integration-ids=)

2. Once deployed on Vercel, go to the [Defer](https://console.defer.run/) Console to [create an account](https://console.defer.run/).

3. Then, create a new Defer application by selecting your GitHub repository created from this template.

4. Finally, go to the [Defer Vercel Integration page](https://vercel.com/integrations/defer) (_Click "Add Integration"_) to connect your Vercel application with your Defer ones.

5. You are good to go! The tasks will now run on Defer, triggered from your Vercel demo application 🚀

<br />

## Clone and run locally

This demo is local-first:

1. Create a Next.js app using this template with the `npx command`:

   ```bash
   npx create-next-app -e https://github.com/defer-run/defer.demo/tree/master/nextjs/user-workflow-template
   ```

2. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

3. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The demo application should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://www.defer.run/docs/get-started/development-testing#local-development).

<br />

> Follow our [Vercel Integration guide](https://www.defer.run/docs/integrations/vercel) to deploy your new repository to Defer and Vecerl without using the "Deploy to Vercel" button
