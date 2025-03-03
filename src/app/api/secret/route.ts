
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
 
  if (!key) {
    return new Response(
      JSON.stringify({ error: "Key parameter is required" }),
      { status: 400 }
    );
  }
  const iFrame = `http://localhost:3000/?key=${key}`;
  return new Response(iFrame, {
    status: 302,
  });
}
