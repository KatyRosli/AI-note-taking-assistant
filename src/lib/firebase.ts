// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, getDownloadURL, ref, uploadBytes} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ainotesassistance.firebaseapp.com",
  projectId: "ainotesassistance",
  storageBucket: "ainotesassistance.appspot.com",
  messagingSenderId: "859319192211",
  appId: "1:859319192211:web:189bd216767e5583531b66",
  measurementId: "G-PQ94HFT0JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);

export async function uploadFileToFirebase(image_url: string, name: string) {
  try {
    const response = await fetch(image_url);
    const buffer = await response.arrayBuffer();
    const file_name = name.replace(" ", "") + Date.now + ".jpeg";
    const storageRef = ref(storage, file_name);
    await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });
    const firebase_url = await getDownloadURL(storageRef);
    return firebase_url;
  } catch (error) {
    console.error(error);
  }
}
