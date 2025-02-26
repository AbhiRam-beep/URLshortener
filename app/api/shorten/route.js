import { db } from "@/lib/firebase";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { collection, where, query, getDocs } from "firebase/firestore";


export async function POST(req) {
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ error: 'URL is requred' }, { status: 400 })
  }
  try {
    const urlRef = collection(db, "urls");
    const q = query(urlRef, where("oldurl", "==", url));
    const querySnapshot = await getDocs(q);

    if (!querys.empty) {
      const existingDoc = querySnapshot.docs[0].data();
      return NextResponse.json({ newurl: existingDoc.shortenedURL });
    }
  } catch (error) {
    console.log(error);
  }
  const surl = nanoid(7);
  const shortenedURL = `https://s-url-one.vercel.app/${surl}`
  return NextResponse.json({ newurl: shortenedURL });
}
