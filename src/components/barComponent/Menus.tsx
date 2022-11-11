import { useState } from "react"


const Menus = ({children, className}:any) => {
    const [open, setOpen] = useState<boolean>(true)
    return (
        <div onClick={() => setOpen(!open)} className={`flex justify-start ${className && className} items-center gap-2 cursor-pointer h-16 rounded-2xl px-3 duration-500 hover:scale-110`}>
            {children}
        </div>
    )
}

export default Menus