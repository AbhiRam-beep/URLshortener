import { db } from "@/lib/firebase"
import { query, where, collection, getDocs } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const { shorturl } = await params;

  try {
    const urlRef = collection(db, "urls");
    const q = query(urlRef, where("newurl", "==", `https://s-url-one.vercel.app/${shorturl}`));
    const res = await getDocs(q);

    if (res.empty) return NextResponse.json({ error: "URL not found" }, { status: 400 });
    const rel = res.docs[0].data();
    return NextResponse.redirect(`https://${rel.oldurl}`, { status: 301 });

  } catch (error) {
    console.log(error);
  }
}
