
/* components */

/* components */

export interface Props {
    close: any;
    open: boolean;
    className: string;
    children: React.ReactNode;
}

const ModalComponent = ({close,open, className, children}:Props) => {
    return (
        <>
            {/* <div onClick={()=>{}} className={`fixed bg-slate-900 top-0 left-0 right-0 bottom-0 z-40 ${!open ? "opacity-0 pointer-events-none" : "opacity-40 pointer-events-auto"} duration-150`}></div>
            <div onClick={close} className={`fixed bg-slate-900 top-0 left-0 right-0 bottom-0 z-40 ${!open ? "opacity-0 pointer-events-none" : "opacity-40 pointer-events-auto"} duration-150`}></div>
                {children}
            </div> */}

            {/* <div onClick={()=>{}} className={`fixed bg-slate-900 top-0 left-0 right-0 bottom-0 z-40 ${!open ? "opacity-0 pointer-events-none" : "opacity-40 pointer-events-auto"} duration-150`}></div>
            <div className={`fixed top-[49%] left-2/4 translate-x-[-50%] translate-y-[-50%] z-50 ${className} ${!open ? "opacity-0 scale-50 pointer-events-none" : "opacity-1 scale-[.99] pointer-events-auto"} hover:scale-100 duration-300`} >
                {children}
            </div> */}

            {/* <div onClick={()=>{}} className={`fixed bg-slate-900 top-0 left-0 right-0 bottom-0 z-40 ${!open ? "opacity-0 pointer-events-none" : "opacity-40 pointer-events-auto"} duration-150`}></div>
            <div className={`fixed w-screen h-screen z-50 ${className} ${!open ? "opacity-0 scale-50 pointer-events-none" : "opacity-1 scale-[.99] pointer-events-auto"} hover:scale-100 duration-300`} >
                <div className="fixed flex top-[-50%]  bottom-[50%] left-2/4 translate-x-[-50%] translate-y-[-50%] overflow-auto">
                    {children}
                </div>
            </div> */}

            {/* <div onClick={()=>{}} className={`fixed bg-slate-900 top-0 left-0 right-0 bottom-0 z-40 ${open ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-150`}></div> */}
            <div onClick={()=>{}} className={`fixed top-0 left-0 right-0 bottom-0 z-40 ${open ? "backdrop-blur-[3px] bg-slate-600/20 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-150`}></div>
            <div className={`fixed flex justify-center py-3 px-1 top-0 left-0 right-0 bottom-0 z-50 ${className} ${open ? "opacity-1 scale-1 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"} duration-300`} >
                {children}
            </div>
        </>
    )
}
export default ModalComponent;