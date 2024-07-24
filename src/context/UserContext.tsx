import { createContext, useContext, useState } from "react";
import { cookieUser } from "../../lib/auth";
import { UserType } from "../types/userType";

interface UserContextType {

    user: UserType | undefined,
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
    load: () => void

}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const userContext = (): UserContextType  => {

    const context = useContext(UserContext);

    if(!context) throw new Error('context should be used inside its provider');

    return context

};

export const UserProvider = ({ children }:any) => {

    const [ user, setUser ] = useState<UserType>();

    async function load() {// get again user from localStorage
        if(typeof window !== "undefined" && (!user || !user.id) ) setUser(await cookieUser() as UserType)
    }

    load()

    return (
        <UserContext.Provider value={{ user, setUser, load }}>
            {children}
        </UserContext.Provider>
    )
}