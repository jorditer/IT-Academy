import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAn0g8GQFD62kgXEL6onqUMak2j2JeMr0E",
  authDomain: "starwars-6d5fe.firebaseapp.com",
  projectId: "starwars-6d5fe",
  storageBucket: "starwars-6d5fe.firebasestorage.app",
  messagingSenderId: "191216322274",
  appId: "1:191216322274:web:59df5592bb26f29d2200bb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
