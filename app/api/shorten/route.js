import { nanoid } from "nanoid";
import { NextResponse } from "next/server";


export async function POST(req) {
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ error: 'URL is requred' }, { status: 400 })
  }
  const surl = nanoid(7);
  const shortenedURL = `http://localhost:3000/${surl}`
  return NextResponse.json({ newurl: shortenedURL });
}
