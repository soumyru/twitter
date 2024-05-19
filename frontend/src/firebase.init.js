import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAw65VGkKKAMAdQ1M2jOjzst4SNXQPRFa8",
  authDomain: "soumyru-twitter.firebaseapp.com",
  projectId: "soumyru-twitter",
  storageBucket: "soumyru-twitter.appspot.com",
  messagingSenderId: "1008866726180",
  appId: "1:1008866726180:web:8e1aee353a751a891d23b1",
  measurementId: "G-4NYNWPJT2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app);
export default auth;
