import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';

const Logout = () => {
    useEffect(() => {
        const handleLogout = async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Error during sign-out:", error);
            }
        };
        handleLogout();
    }, [auth]);

    return null;
};

export default Logout;
