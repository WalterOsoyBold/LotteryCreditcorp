import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth }  = useContext(AuthContext);
    // useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    useDebugValue( "Logged In" )
    return useContext(AuthContext);
}

export default useAuth;