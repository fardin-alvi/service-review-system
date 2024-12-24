import { useContext } from 'react';
import { Authcontext } from '../provider/Authprovider';

const useAuth = () => {
    const context = useContext(Authcontext)
    console.log(context);
    return context
};

export default useAuth;