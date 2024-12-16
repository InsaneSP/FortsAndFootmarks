// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqoFBbIag0Dg-Z0yiFgdBZOFltCJRpuUs",
    authDomain: "fortsandfootmarks.firebaseapp.com",
    projectId: "fortsandfootmarks",
    storageBucket: "fortsandfootmarks.firebasestorage.app",
    messagingSenderId: "1014565317359",
    appId: "1:1014565317359:web:296a6ca0e618a2b0c7c91a",
    measurementId: "G-3JVDPXL4XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;