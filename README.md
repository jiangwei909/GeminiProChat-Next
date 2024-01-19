This is a Gemini Pro chat built with Nextjs

Live demo: [Gemini Pro Chat](https://www.gemini-pro-chat.com)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

if you need a proxy to access gemini pro api, please set `https_proxy` in environments, such as

```bash
export https_proxy=http://127.0.0.1:1087
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jiangwei909/GeminiProChat-Next&env=GEMINI_API_KEY&envDescription=Google%20API%20Key%20for%20GeminiProChat&envLink=https://makersuite.google.com/app/apikey&project-name=gemini-pro-chat-next&repository-name=gemini-pro-chat-next&demo-title=Gemini%20Pro%20Chat%20Next&demo-description=A%20Nextjs%20web%20UI%20for%20Gemini%20Pro.&demo-url=https%3A%2F%2Fgemini-pro-chat.com&demo-image=https%3A%2F%2Fgemini-pro-chat.com%2Flogo.png)

Just click the button above and follow the instructions to deploy your own copy of the app.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Environment Variables

You can control the website through environment variables.

| Name | Description | Required |
| --- | --- | --- |
| `GEMINI_API_KEY` | Your API Key for GEMINI. You can get it from [here](https://makersuite.google.com/app/apikey).| **✔** |
