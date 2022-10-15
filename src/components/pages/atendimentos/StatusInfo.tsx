/* components */


/* components */

export interface Props {
    status: string;
    textColor: string;
    backgroundColor: string
}


export default function InfoCard( { status, textColor, backgroundColor } :Props ) {
return (
    <>
       {/* <div className={`flex justify-center items-center ${color} w-fit h-fit rounded-lg py-1 px-3`}> */}
       <div className={`flex justify-center items-center ${backgroundColor} w-fit h-fit rounded-lg py-1 px-3 scale-95`}>
              <p className={`text-sm ${textColor} font-bold`}>{status}</p>
        </div>
    </>
)
}