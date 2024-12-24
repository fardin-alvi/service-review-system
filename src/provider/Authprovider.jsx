import { createContext, useEffect, useState } from 'react';
import auth from "../Firebase/Firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import useAxios from '../hooks/useAxios';

export const Authcontext = createContext(null)
const provider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const axiosSecure = useAxios()

    const CreateUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singinWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    };

    const updateprofile = (updatedate) => {
        return updateProfile(auth.currentUser, updatedate)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user?.email) {
                setUser(user);
                await axiosSecure.post('/jwt', {
                    user: user?.email
                })
                    .then(res => {
                        console.log(res.data);
                })
            } else {
                setUser(user)
                await axiosSecure.get('/logout')
            }
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const authinfo = {
        CreateUser,
        singinWithGoogle,
        user,
        setUser,
        login,
        logout,
        loading,
        setLoading,
        updateprofile,
    }

    return (
        <Authcontext.Provider value={authinfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;