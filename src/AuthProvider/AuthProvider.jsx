import { createContext, useEffect, useState } from "react"
import { app } from "../firebase-config/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";



export const AuthContext = createContext(null);

const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider()
    
    const CreateUser = (email, password) => {
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
            console.log(currentUser);
        })
        return ( 
            ()=>{
            return unsubscribe()
        }
    );
  }, []);

    const authInfo = {
        user,
        loading,
        CreateUser,
        Login,
        Logout,
        GoogleLogin,
    }

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider;


