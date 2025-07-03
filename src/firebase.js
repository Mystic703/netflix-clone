
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAkqP8hTCLf6ozrbm4rNjoFykqULRznEGo",
  authDomain: "netflix-clone-14553.firebaseapp.com",
  projectId: "netflix-clone-14553",
  storageBucket: "netflix-clone-14553.firebasestorage.app",
  messagingSenderId: "311978473452",
  appId: "1:311978473452:web:b522bd0a0c70b31c50b2c9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const logout= ()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout};