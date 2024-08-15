import { createContext, useContext, useState } from "react";
import { cookieUser } from "../../lib/auth";
import { UserType } from "../types/userType";
import Svg from "../components/icons/Svg";
import NotificationItem from "../components/Notification/NotificationItem";



interface ContextType {

    list: NotificationItemType[] | undefined,
    push: (object: NotificationItemType) => void

}

export interface NotificationItemType {
    type: 'alert' | 'success' | 'warning' | 'error',
    title: string,
    description: string,
    time?: number
}

const Context = createContext<ContextType | undefined>(undefined);

export const useNotification = () => {

    const context = useContext(Context);

    if(!context) throw new Error('context should be used inside its provider');

    return context

};

export const NotificationContext = ({ children }:any) => {

    const [ list, setList ] = useState<NotificationItemType[]>([])

    function removeItem(index: number) {

        setList((prev) => (prev.filter((e, i)=> i !== index)))

    }

    function push(item: NotificationItemType) {
        
        setList((prev) => {

            setTimeout(()=> removeItem(prev.length), (item.time || 700) + 700)

            return [...prev, item]

        })
        
    }

    return (

        <Context.Provider value={{ list, push }}>

            <div className='w-full h-full flex absolute z-50 pointer-events-none overflow-hidden'>

                <div className='relative flex flex-col ml-auto p-3 gap-3'>

                    { list?.map((item, i) =>  <NotificationItem key={i} notification={item} onClose={()=> removeItem(i)} />) }

                </div>

            </div>

            {children}

        </Context.Provider>
    )
}