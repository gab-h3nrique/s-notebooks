import { useState } from "react"

// https://www.svgrepo.com/svg/205144/cloud-computing
const IconMenu = ({children}:any) => {
    const [open, setOpen] = useState<boolean>(true)
    return (
        <div className={`flex cursor-pointer ${open && "rotate-[360deg]"} duration-500 border-white w-fit h-fit rounded-lg p-2 cursor-pointer`}>
            <div className={`cursor-pointer ${open && "rotate-[-360deg]"} duration-500`}>
            {children}
            </div>
        </div>
       
    )
}

export default IconMenu