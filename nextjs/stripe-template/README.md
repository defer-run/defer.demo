# Example using Stripe with Defer

> This template is based [on the official Stripe template](https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript) and often regularly.

<br />

This is a full-stack TypeScript example using:

- Frontend:
  - Next.js
  - [react-stripe-js](https://github.com/stripe/react-stripe-js) for [Checkout](https://stripe.com/checkout) and [Elements](https://stripe.com/elements)
- Backend
  - Next.js [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) and [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
  - [stripe-node with TypeScript](https://github.com/stripe/stripe-node#usage-with-typescript)
  - [Defer](https://www.defer.run) to process Stripe webhooks

## Demo

- [Stripe Guide](https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe)
- [Defer webhooks Guide](https://www.defer.run/docs/guides/stripe-webhooks)

The demo is running in test mode -- use `4242424242424242` as a test card number with any CVC + future expiration date.

Use the `4000002760003184` test card number to trigger a 3D Secure challenge flow.

[Read more](https://stripe.com/docs/testing) about testing on Stripe.

## Included functionality

- Stripe Checkout
  - Custom Amount Donation with redirect to Stripe Checkout:
    - Server Component: [app/donate-with-checkout/page.tsx](app/donate-with-checkout/page.tsx)
    - Server Action: [app/actions/stripe.ts](app/actions/stripe.ts)
    - Checkout Session 'success' page fetches the Checkout Session object from Stripe: [donate-with-checkout/result/page.tsx](app/donate-with-checkout/result/page.tsx)
- Stripe Elements
  - Custom Amount Donation with Stripe Payment Element & PaymentIntents:
    - Server Component: [app/donate-with-elements/page.tsx](app/donate-with-elements/page.tsx)
    - Server Action: [app/actions/stripe.ts](app/actions/stripe.ts)
    - Payment Intent 'success' page (via `returl_url`) fetches the Payment Intent object from Stripe: [donate-with-elements/result/page.tsx](app/donate-with-elements/result/page.tsx)
- Webhook handling for [post-payment events](https://stripe.com/docs/payments/handling-payment-events)
  - Route Handler: [app/api/webhooks/route.ts](app/api/webhooks/route.ts)

## Deploy this template

1. First, click on the following button will fork this demo repository and deploy it on your Vercel account: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fstripe-template%2F&project-name=nextjs-with-stripe-defer&repository-name=nextjs-with-stripe-defer&demo-title=nextjs-with-stripe-defer&demo-description=Perform%20long-running%20tasks,%20workflows%20and%20CRONs%20within%20your%20Next.js%20application.&demo-url=https%3A%2F%2Fdemo-nextjs-with-stripe-defer.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fdefer-run%2Fdefer.demo%2Ftree%2Fmaster%2Fnextjs%2Fstripe-template%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fdefer-run%2Fdefer.demo%2Fmaster%2Fnextjs%2Fstripe-template%2Fapp%2Fog_image.png&integration-ids=)

2. Once deployed on Vercel, go on the [Defer Console to create an account](https://console.defer.run/).

3. Then, create a new Defer application by selecting your GitHub repository created from this template.

4. Finally, go to the [Defer Vercel Integration page](https://vercel.com/integrations/defer) (_Click "Add Integration"_) to connect your Vercel application with your Defer ones.

5. You are go to go! The tasks will now run on Defer, triggered from your Vercel demo application 🚀

<br />

### Setting up a live webhook endpoint

After deploying, copy the deployment URL with the webhook path (`https://your-url.vercel.app/api/webhooks`) and create a live webhook endpoint [in your Stripe dashboard](https://stripe.com/docs/webhooks/setup#configure-webhook-settings).

Once created, you can click to reveal your webhook's signing secret. Copy the webhook secret (`whsec_***`) and add it as a new environment variable in your [Vercel Dashboard](https://vercel.com/dashboard):

- Select your newly created project.
- Navigate to the Settings tab.
- In the general settings scroll to the "Environment Variables" section.

After adding an environment variable you will need to rebuild your project for it to become within your code. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy".

## Clone and run locally

1. Create a Next.js app using this template with the `npx command`:

   ```bash
   npx create-next-app -e https://github.com/defer-run/defer.demo/tree/master/nextjs/app-template
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

### Required configuration

Copy the `.env.local.example` file into a file named `.env.local` in the root directory of this project:

```bash
cp .env.local.example .env.local
```

You will need a Stripe account ([register](https://dashboard.stripe.com/register)) to run this sample. Go to the Stripe [developer dashboard](https://dashboard.stripe.com/apikeys) to find your API keys and replace them in the `.env.local` file.

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

Now install the dependencies and start the development server.

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

### Forward webhooks to your local dev server

First [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#link-account).

Next, start the webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/webhooks
```

The CLI will print a webhook secret key to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.

## Authors

- [@thorsten-stripe](https://twitter.com/thorwebdev)
- [@lfades](https://twitter.com/luis_fades)
- [@jsteele-stripe](https://twitter.com/ynnoj)
- [@whereischarly](https://twitter.com/whereischarly)
- [@gearnode](https://twitter.com/gearnode)
