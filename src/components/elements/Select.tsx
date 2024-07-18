import React from 'react'

interface DropProps {

    close: () => any;
    isOpen: boolean;
    className?: string;
    children: React.ReactNode;

}

function Drop({ isOpen, className, children }: DropProps) {

    return (
        <>
            <div className={`${!isOpen ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto z-[99]"} absolute w-full h-48 origin-center rounded-md bg-white shadow-2xl overflow-auto overflow-x-hidden cursor-pointer duration-150 ${className}`} >
                <div className="py-1" >

                    { children }

                </div>

            </div>
            <div className={`fixed top-0 left-0 backdrop-blur-[3px] w-screen h-screen ${!isOpen ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto z-[98]"}`}> a</div>
        </>

    )
}

interface ItemProps {

    onClick: () => any;
    className?: string;
    value: string | number;

}

function Item({ onClick, className, value }: ItemProps) {

    return (

        <a onClick={onClick} className={` block px-4 py-2 text-sm font-medium text-slate-500 bg-white hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointe rounded-md ${className}`} >
            { value }
        </a>

    )
}



const DropDown = {
    Content: Drop,
    Item: Item,
}


export default DropDown