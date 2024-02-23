import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA2YEle3ikUXz7l7_IGKQcxy9zzD1v5_eE",
  authDomain: "quotes-90635.firebaseapp.com",
  projectId: "quotes-90635",
  storageBucket: "quotes-90635.appspot.com",
  messagingSenderId: "294119252050",
  appId: "1:294119252050:web:7fee5d71c2fbf9bec6bf8b",
  measurementId: "G-V24T9Y250R",
  databaseURL : "https://quotes-90635-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
