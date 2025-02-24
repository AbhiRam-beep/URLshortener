'use client'
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const Home = () => {
  const [shorturl, setShorturl] = useState(null);
  const [inputURL, setInputURL] = useState("");

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
  };

  const addURL = async (oldurl, newurl) => {
    try {
      const docRef = await addDoc(collection(db, "urls"), { oldurl, newurl });
      console.log("document id:" + docRef.id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputURL) return;


    const newShortURL = await getShortURL(inputURL);
    if (newShortURL) {
      await addURL(inputURL, newShortURL);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={inputURL}
            placeholder="Enter URL"
            onChange={(e) => setInputURL(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
            Shorten URL
          </button>
        </form>
        {shorturl && (
          <div className="mt-4 p-3 bg-gray-50 border rounded-lg text-center">
            <p className="text-gray-700">Shortened URL:</p>
            <a href={shorturl} target="_blank" className="text-blue-500 font-semibold hover:underline">
              {shorturl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
