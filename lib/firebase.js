import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJMcPz9uYufXsC0kMSzyD4qIPeAHS2mVk",
  authDomain: "urlshortener-f5a55.firebaseapp.com",
  projectId: "urlshortener-f5a55",
  storageBucket: "urlshortener-f5a55.firebasestorage.app",
  messagingSenderId: "629298306535",
  appId: "1:629298306535:web:6b185100e2b137a2ea3142",
  measurementId: "G-T5KGFQMEYG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
