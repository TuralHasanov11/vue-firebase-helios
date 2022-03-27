import {initializeApp} from "firebase/app";
import "firebase/firestore";
import {serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore}  from "firebase/firestore";
import { getStorage } from "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const timestamp = serverTimestamp()
const fileStorage = getStorage(app);

export { timestamp, auth, fileStorage }
export default getFirestore(app);