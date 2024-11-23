import { createContext, useEffect, useState } from "react"
import { app } from "../firebase-config/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";



export const AuthContext = createContext(null);

const auth = getAuth(app)

const AuthProvider = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider()
    
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const Login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };    

    const Logout = ()=>{
        return signOut(auth);
    };

    const GoogleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ( 
            ()=>{
            return unsubscribe()
        },
        []
    );
  });

    const authInfo = {
        user,
        loading,
        createUser,
        Login,
        Logout,
        GoogleLogin,
    }

    return (
        <div>
      
        </div>
    )
}

export default AuthProvider;
