/* components */

import AngleUpIcon from "../icons/AngleUpIcon";

/* components */

export interface Props {
    page: number;
    pageHandle: any;
    total: number;
}


export default function Paginate({ page, pageHandle, total}:Props) {

    // const { page, pageHandle, total}:Props = props

    return (
        <>
            <article className="flex justify-center items-centerw-full">
                <section className=" bg-white w-full rounded-3xl flex items-center p-2 justify-between">
                    <button disabled={page && page === 1 ? true : false} onClick={()=>pageHandle(page?page-1: 1)} className={`flex bg-orange-500 rounded-2xl py-2 px-3 gap-1 items-center  hover:scale-110 duration-300 cursor-pointer ${page && page === 1 ? 'opacity-50' : 'opacity-1'}`}>
                        <AngleUpIcon transform={'rotate(270)'} width={22} height={22} fill={`white`}/>
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
                    <AngleUpIcon transform={'rotate(90)'} width={22} height={22} fill={`white`}/>
                </button>
                </section>
            </article>  
        </>
    )
}
