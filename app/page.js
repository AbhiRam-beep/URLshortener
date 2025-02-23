'use client'
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const Home = () => {

  const [shorturl, setShorturl] = useState(null);
  const [inputURL, setInputURL] = useState(null);

  const getShortURL = async (url) => {
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Error generating shortened URL");

      const data = await res.json();
      setShorturl(data.newurl);
      return data.newurl;
    } catch (error) {
      console.log("error: " + error);
      return false;
    }

  }

  const addURL = async (oldurl, newurl) => {
    try {
      const docRef = await addDoc(collection(db, "urls"), { oldurl, newurl });
      console.log("document id:" + docRef.id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputURL) return;

    await getShortURL(inputURL);

    if (shorturl) {
      await addURL(inputURL, shorturl)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputURL} placeholder="enter URL" onChange={(e) => setInputURL(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {shorturl && (
          <div>
            <p>Shortened URL: <a href={shorturl} target="_blank">{shorturl}</a></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;
