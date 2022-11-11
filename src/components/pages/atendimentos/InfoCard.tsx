/* components */

import ArrowUpIcon from "../../icons/ArrowUpIcon";
import PasteIcon from "../../icons/PasteIcon";
import IconMenu from "../../barComponent/IconMenu";

/* components */

export interface Props {
    title: string;
    total: Number;
    porcent: Number;
    children: React.ReactNode
}


export default function InfoCard({ title, total, porcent, children } :Props) {
    return (
        <>
            <div className="flex flex-col justify-between gap-1 bg-white w-full p-4 rounded-2xl">
                <section className="flex items-center gap-1">
                    {children}
                    <p className="text-xl text-slate-400 font-semibold ">{title}</p>
                </section>
                <section className="flex justify-between items-center gap-1 px-2">
                    <p className="text-3xl text-slate-600 font-semibold"><>{total}</></p>
                    <div className="flex justify-center items-center">
                        <IconMenu>
                            <ArrowUpIcon width={20} height={20} fill={`rgb(34 197 94)`}/>
                        </IconMenu>
                        <p className="text-sm text-green-500 font-bold ">{`${porcent}%`}</p>
                    </div>
                </section>
            </div>
        </>
    )
}

// CARD ANTIGO

// export default function Card({notes}:any) {
//   const {id, title, description,}:UserNotes = notes;
//   return (
//     <>
//       <div className="default-card">
//           <div className="default-content">
//               <div className="flex flex-col h-full w-full space-y-5 ">

//                   <div className="default-title  w-full h-5">
//                     {title}
//                   </div>

//                   <div className="default-font h-full !text-clip overflow-hidden ">
//                     <div className="text-sm">
//                       {description}
//                     </div>
//                   </div>

//                   <div className="h-5 w-full !self-end justify-end">
//                       <div className="default-title text-sm text-right">
//                         15 hours ago
//                       </div>
//                   </div>

//               </div>
//           </div>
//       </div>
//     </>
//   )
// }
