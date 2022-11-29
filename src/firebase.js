
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPHbAxZ-bR5KxeYBCd2I6kLh3yBULNUko",
  authDomain: "chat-app-b78eb.firebaseapp.com",
  projectId: "chat-app-b78eb",
  storageBucket: "chat-app-b78eb.appspot.com",
  messagingSenderId: "1053273487898",
  appId: "1:1053273487898:web:133da6df32d26ed36bafa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);