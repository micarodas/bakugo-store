import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtT1SO6BF_kTzfFBTJZxXw8QxZ1sqVo24",
  authDomain: "bakugo-store.firebaseapp.com",
  projectId: "bakugo-store",
  storageBucket: "bakugo-store.appspot.com",
  messagingSenderId: "663158744680",
  appId: "1:663158744680:web:1bcd243565d0ce4908fddd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
