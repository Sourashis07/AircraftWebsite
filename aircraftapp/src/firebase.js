// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTxXFgKh3_b2S_D6ywFAH8gXe8iJwd2Dc",
  authDomain: "skygram-89a29.firebaseapp.com",
  projectId: "skygram-89a29",
  storageBucket: "skygram-89a29.firebasestorage.app",
  messagingSenderId: "688626485207",
  appId: "1:688626485207:web:30e985dfa094ce59de2d92",
  measurementId: "G-HEZCXRNLDW"
};

const app = initializeApp(firebaseConfig);

// Export initialized auth
const auth = getAuth(app);
export { auth };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);


// // const firebaseConfig = {
//   apiKey: "AIzaSyCTxXFgKh3_b2S_D6ywFAH8gXe8iJwd2Dc",
//   authDomain: "skygram-89a29.firebaseapp.com",
//   projectId: "skygram-89a29",
//   storageBucket: "skygram-89a29.firebasestorage.app",
//   messagingSenderId: "688626485207",
//   appId: "1:688626485207:web:30e985dfa094ce59de2d92",
//   measurementId: "G-HEZCXRNLDW"
// };