// 文件路径：pages/api/reverse.js
// Notice from where NextResponse is imported:
// import { NextResponse } from "next/server";
export async function POST(req) {
  // 获取POST请求的body，也就是用户输入的字符串
  const body = await req.json()
  // const formData = await req.formData()

  // console.log(formData);
  const text = body.input;
  // console.log(`text = ${text}`);
  if (!text || typeof text !== "string") {
    // res.status(400).json({ message: '请输入有效的字符串' });
    // return;
    // console.log("threeee");
    const reversedText = "请输入有效的字符串";
    // return NextResponse.json(reversedText, { status: 200 });
    return Response.json({ error: "Please provide a text to reverse." }, {status: 400});
  }

  // 反转字符串
  const reversedText = text.split("").reverse().join("");

  // 返回反转后的字符串
  // return NextResponse.json(reversedText, { status: 200 });
  return Response.json({ reversedText });
}

// export function POST(req, res) {
//   const { body } = req
//   const reversedString = body.split('').reverse().join('')
//   res.status(200).json({ reversedString: reversedString })
// }
