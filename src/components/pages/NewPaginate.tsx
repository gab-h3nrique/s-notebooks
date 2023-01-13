/* components */

import AngleUpIcon from "../icons/AngleUpIcon";
import DoubleAngleIcon from "../icons/DoubleAngleIcon";

/* components */

export interface Props {
    page: number;
    pageHandle: any;
    total: number;
}


export default function NewPaginate({ page, pageHandle, total}:Props) {

    // const { page, pageHandle, total}:Props = props

    return (
        <>
            <article className="ml-auto flex justify-between gap-2 items-center">

                <section onClick={()=>pageHandle(1)} className="bg-slate-100 border-solid border-[.2rem] border-white flex items-center justify-center rounded-2xl h-full px-3  text-white cursor-pointer hover:scale-105 duration-150">
                    <DoubleAngleIcon className="rotate-[270deg] w-6 h-6 fill-slate-400 cursor-pointer hover:fill-orange-500 duration-150"/>
                </section>

                <section className="bg-slate-100 flex h-full items-center justify-center border-solid border-[.2rem] border-white rounded-2xl gap-2 hover:scale-105 duration-150">

                    <div onClick={()=>page && page > 1 && pageHandle(page?page-1: 1)}>
                        <AngleUpIcon className="rotate-[270deg] w-6 h-6 fill-slate-400 cursor-pointer hover:fill-orange-500 hover:scale-110 duration-150"/>
                    </div>

                    <div className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{`${page} de ${total}`}</div>

                    <div onClick={()=>total && page < total && pageHandle(page?page+1: 1)}>
                        <AngleUpIcon className="rotate-[90deg] w-6 h-6 fill-slate-400 cursor-pointer hover:fill-orange-500 hover:scale-110 duration-150"/>
                    </div>
                </section>

                <section onClick={()=>pageHandle(total)} className="bg-slate-100 border-solid border-[.2rem] border-white flex items-center justify-center rounded-2xl h-full px-3  text-white cursor-pointer hover:scale-105 duration-150">
                    <DoubleAngleIcon className="rotate-[90deg] w-6 h-6 fill-slate-400 cursor-pointer hover:fill-orange-500 duration-150"/>
                </section>

            </article>
        </>
    )
}
