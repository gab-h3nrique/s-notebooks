
/* components */

import { useEffect, useState } from "react";
import ReactDom from "react-dom";

/* components */

export interface Props {
    close: any;
    open: boolean;
    className: string;
    children: React.ReactNode;
}

const ModalComponent = ({close,open, className, children}:Props) => {

    const [portal, setPortal] = useState<HTMLElement>()

    useEffect(()=>{
        if (typeof window !== "undefined") {
            setPortal(document.getElementById('portal') as HTMLElement);
        }
    },[])

    return (
        portal ? ReactDom.createPortal(
            <>
                {/* <div className={`fixed flex justify-center py-3 px-1 top-0 left-0 right-0 bottom-0 z-50 ${className} ${open ? "opacity-1 scale-1 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"} duration-300`} >
                    {children}
                </div> */}
                <div className={`fixed flex justify-center py-3 px-1 top-0 left-0 right-0 bottom-0 m-auto z-50 ${className} ${open ? "opacity-1 scale-1 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"} duration-300`} >
                    {children}
                </div>
                <div onClick={()=> console.log('bbbbbb')} className={`fixed top-0 left-0 right-0 bottom-0 z-40 ${open ? "backdrop-blur-[3px] bg-black/20 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-150`}></div>
            </>,
            portal
        ) : null
    )
    
}
export default ModalComponent;