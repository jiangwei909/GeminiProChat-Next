// import Response from "react"

export async function GET(request) {
  // const res = await req.json();
  console.log(`${request}`);
  // console.log(res);
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  return Response.json({ message: `Hello from Next.js! id = ${id}` });
}
