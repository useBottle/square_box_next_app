export async function POST(req: Request) {
  const result = await req.json();
  console.log(result.url);
}
