// const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const { HttpsProxyAgent } = require("https-proxy-agent");

export async function POST(req) {
  if (typeof process.env.GEMINI_API_KEY === "undefined") {
    Response.status = 400;
    return Response.json({ error: "Invalid gemini api key." }, { status: 400 });
  }
  const api_key = process.env.GEMINI_API_KEY;

  const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`;

  const body = await req.json();
  const input = body.input;

  // const parts = input.map((item) => {
  //   return { text: item.content };
  // });
  const parts = { text: input };

  const reqData = JSON.stringify({
    contents: [
      {
        parts: parts,
      },
    ],
  });

  // request header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    proxy: false,
  };
  const httpProxy = process.env["https_proxy"];
  // console.log(httpProxy)
  if (httpProxy) {
    const agent = new HttpsProxyAgent(httpProxy);
    config.httpsAgent = agent;
  }

  const postRequest = async () => {
    const response = await axios.post(api_url, reqData, config);
    return response.data;
  };

  try {
    const data = await postRequest();
    const text = data.candidates[0].content.parts[0].text;
    return Response.json({ text });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
