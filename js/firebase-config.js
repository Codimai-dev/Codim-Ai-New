// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3qEl5IY0ethfF9D8DowBGFY2jLfKnLuw",
  authDomain: "codimai-website.firebaseapp.com",
  projectId: "codimai-website",
  storageBucket: "codimai-website.appspot.com",
  messagingSenderId: "1053474772708",
  appId: "1:1053474772708:web:c7b82c3222a358357a3ef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export what your app ACTUALLY uses
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
