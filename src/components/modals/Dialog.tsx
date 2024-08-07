import React from 'react'

interface Props {

    close: () => any;
    isOpen: boolean;
    className?: string;
    children: React.ReactNode;

}

export default function Dialog({ close, isOpen, className, children }: Props) {

    return (
        <>
            <div className={`${!isOpen ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto z-[99]"} flex w-fit h-fit absolute m-auto top-0 bottom-0 left-0 right-0 origin-center rounded-md bg-white shadow-2xl overflow-auto overflow-x-hidden cursor-pointer duration-150 ${className}`} >
                <div className="flex w-fit h-fit" >

                    { children }

                </div>
            </div>
            <div onClick={close} className={`fixed top-0 left-0 backdrop-blur-[.8px] w-screen h-screen ${!isOpen ? "opacity-0 pointer-events-none hidden" : "opacity-1 pointer-events-auto z-[98]"}`}></div>
        </>

    )
}