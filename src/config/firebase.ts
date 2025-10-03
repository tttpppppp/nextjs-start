// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqY-BrpbZdEUPHOE_lcvv53vc5h5Uv0BY",
  authDomain: "nextjs-60029.firebaseapp.com",
  projectId: "nextjs-60029",
  storageBucket: "nextjs-60029.firebasestorage.app",
  messagingSenderId: "573342383591",
  appId: "1:573342383591:web:d4a11b3c94b0e2e5c05142",
  measurementId: "G-KVXFP6C7GB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// if (process.env.NODE_ENV === "development") {
//   connectFirestoreEmulator(db, "localhost", 8080);
//   console.log("Firebase local");
// }
export { app, db };
