import { createContext, useEffect, useState } from "react"
import { app } from "../firebase-config/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import axios from "axios";



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
            if(currentUser){
                axios.post(`http://localhost:4000/authentication`, {email: currentUser.email,}).then(data=>{
                    if(data.data){
                        localStorage.setItem("access-token", data?.data?.token)
                        setLoading(false)
                    }
                });
            }
            else{
                localStorage.removeItem("access-token");
                setLoading(false)
            }
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


