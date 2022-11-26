import { useState } from "react"


const Menus = ({children, className, onClick}:any) => {
    return (
        <div onClick={onClick} className={`flex justify-start ${className && className} items-center gap-2 cursor-pointer h-16 rounded-2xl px-3 duration-300 hover:scale-110`}>
            {children}
        </div>
    )
}

export default Menus