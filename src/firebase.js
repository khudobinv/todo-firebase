import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYqfpzDcs4HYzg9Hlf5V7A1FtZnAzOIms",
  authDomain: "todo-app-ff9fd.firebaseapp.com",
  databaseURL: "https://todo-app-ff9fd-default-rtdb.firebaseio.com",
  projectId: "todo-app-ff9fd",
  storageBucket: "todo-app-ff9fd.appspot.com",
  messagingSenderId: "530495722214",
  appId: "1:530495722214:web:c7e3e728de0134129e2127",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
