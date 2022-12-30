/* components */

import { useEffect } from "react";


/* components */

export interface Props {
    status: string;
    textColor: string;
    backgroundColor: string
    className?:string
}


export default function InfoCard( { status, textColor, backgroundColor, className } :Props ) {

return (
    <>
       <div className={`flex justify-center items-center ${backgroundColor} rounded-lg py-1 px-3 scale-95 ${className ? className : 'w-fit h-fit'}`}>
              <p className={`text-sm ${textColor} font-bold overflow-hidden text-ellipsis whitespace-nowrap`}>{status}</p>
        </div>
    </>
)
}