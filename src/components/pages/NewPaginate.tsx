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
                <section onClick={()=>pageHandle(1)} className="bg-slate-400 flex items-center justify-center rounded-2xl h-full w-20  text-white cursor-pointer">
                    <p className="text-white text-sm font-bold">Primeira</p>
                </section>

                {/* <section onClick={()=>pageHandle(1)} className="bg-orange-500 flex items-center justify-center rounded-2xl h-full px-3  text-white cursor-pointer">
                    <DoubleAngleIcon className="rotate-[270deg] w-6 h-6 fill-white cursor-pointer"/>
                </section> */}

                <section className="bg-slate-100 flex h-full items-center justify-center border-solid border-[.2rem] border-white rounded-2xl gap-2">

                    <div onClick={()=>page && page > 1 && pageHandle(page?page-1: 1)}>
                        <AngleUpIcon className="rotate-[270deg] w-6 h-6 fill-slate-400 cursor-pointer"/>
                    </div>

                    <div className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{`${page} de ${total}`}</div>

                    <div onClick={()=>total && page < total && pageHandle(page?page+1: 1)}>
                        <AngleUpIcon className="rotate-[90deg] w-6 h-6 fill-slate-400 cursor-pointer"/>
                    </div>
                </section>

                {/* <section onClick={()=>pageHandle(total)} className="bg-orange-500 flex items-center justify-center rounded-2xl h-full px-3  text-white cursor-pointer">
                    <DoubleAngleIcon className="rotate-[90deg] w-6 h-6 fill-white cursor-pointer"/>
                </section> */}

                <section onClick={()=>pageHandle(total)} className="bg-slate-400 flex items-center justify-center rounded-2xl h-full w-20  text-white cursor-pointer">
                    <p className="text-white text-sm font-bold">Última</p>
                </section>
            </article>
            {/* <article className="flex justify-center items-center w-full">
                <section className=" bg-white w-full rounded-2xl flex items-center p-2 justify-between">
                    <button disabled={page && page === 1 ? true : false} onClick={()=>pageHandle(page?page-1: 1)} className={`flex bg-orange-500 rounded-2xl py-2 px-3 gap-1 items-center  hover:scale-110 duration-300 cursor-pointer ${page && page === 1 ? 'opacity-50' : 'opacity-1'}`}>
                        <AngleUpIcon transform={'rotate(270)'} width={18} height={18} fill={`white`}/>
                        <p className={`text-white text-sm font-semibold duration-300`}>Prev</p>
                    </button>
                    <div className="flex gap-2">

                    {
                        total && page ? 
                        Array.from(Array(total)).map((e, index) => {
                            if(index+1 > page - 4 && index+1 < page + 4) {
                            return (
                                <div onClick={()=>pageHandle(index+1)} key={index} className={`flex ${(index+1) === page ? 'bg-orange-500' : 'bg-slate-300'} items-center justify-center rounded-2xl py-[.3rem] px-[1.1rem] gap-1 hover:scale-110 duration-300 cursor-pointer`}>
                                    <p className={`text-white text-2xl font-bold duration-300`}>{index+1}</p>
                                </div>
                            )
                            }
                            
                        })
                        : null
                    }
                    </div>
                    

                <button disabled={total && page === total ? true : false} onClick={()=>pageHandle(page?page+1: 1)} className={`flex bg-orange-500 rounded-2xl py-2 px-3 gap-1 items-center  hover:scale-110 duration-300 cursor-pointer ${total && page === total ? 'opacity-50' : 'opacity-1'}`}>
                    <p className={`text-white text-sm font-semibold duration-300`}>Next</p>
                    <AngleUpIcon transform={'rotate(90)'} width={18} height={18} fill={`white`}/>
                </button>
                </section>
            </article>   */}
        </>
    )
}
