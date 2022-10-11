import { createContext, useContext, useState } from "react";
import { cookieUser } from "../../lib/auth";

export const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }:any) => {
    const [authUser, setAuthUser]:any = useState({});

    const getAuthUser = () => {
        return  authUser
    }

    const addAuthUser = async() => {// FUNÇÃO PARA PREENCHER O USUARIO NOVAMENTE NO CONTEXT
        if (typeof window !== "undefined" && !authUser.id) setAuthUser(await cookieUser() as Object)
    }

    const removeAuthUser = () => {
        setAuthUser({})
    }

    //função apenas para login e cadastro
    const setAuthUserLogin = async(userObject:object) => {// FUNÇÃO PARA SETAR O NOVO USUARIO NO CONTEXT TODA VEZ QUE ELE LOGA
        setAuthUser(userObject)
    }

    return (
        <AuthContext.Provider value={{authUser, getAuthUser, addAuthUser, removeAuthUser, setAuthUserLogin}}>
            {children}
        </AuthContext.Provider>
    )
}