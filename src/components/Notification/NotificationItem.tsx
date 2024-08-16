import { useEffect, useState } from "react";
import { NotificationItemType } from "../../context/NotificationContext";
import Svg from "../icons/Svg";





interface Props {
    notification: NotificationItemType;
    onClose?: () => void
}


export default function NotificationItem({ notification, onClose }: Props) {

    const [start, setStart] = useState(false)

    useEffect(()=> {

        setStart(true)

        return () => setStart(false)

    }, [])

    return (

        <article className='flex w-80 h-24 relative'>
            <div className={`${ start && '-translate-x-96'} absolute left-96 ease-in-out duration-700 bg-white justify-between rounded-lg w-full h-full p-3 gap-2 flex shadow-sm pointer-events-auto`}>
    
                {/* {
                    notification.type ? 
                } */}
    
                <section>
                    {
                        notification.type == 'success' ?  <Svg.Check className="h-5 w-5" fill='#16a34a' /> 
                        : <Svg.Check className="h-5 w-5" fill='#16a34a' />
                    }
                </section>
    
                
                <section className='flex flex-col gap-1'>
                    <span className='font-semibold text-slate-500 opacity-80 text-base'>{notification.title}</span>
                    <p className='font-medium text-slate-500 opacity-80 text-sm'>{notification.description}</p>
                </section>
    
                <section onClick={onClose}>
                    <Svg.Close className="fill-slate-500/80 w-4 h-4 cursor-pointer" fill='rgb(100 116 139 / 0.8)'/>
                </section>
                
            </div>
        </article>


    )

}