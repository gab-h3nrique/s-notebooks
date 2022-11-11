/* components */

import { useState } from "react";
import { getApi } from "../../../lib/api";
import AngleUpIcon from "../icons/AngleUpIcon";



/* components */

export interface Props {
    value: any;
}


export default function Paginate(props :any) {
    
    const { arrayOrder, setArrayOrder, paginateConfig, setPaginateConfig } = props;

    // const [ currentPage, setCurrentPage ] = useState<number>(page ? page : 1)

    // const [ firstPage, setFirstPage] = useState<number>()

    // const getOrders = async(page:number, limit:number) => {
   
    //     const {response:orders} = await getApi('/api/auth/orders', {page, limit})
    //     console.log(orders)
    //     setArrayOrder(orders.results)
    
    // } 
    console.log('teste: ', arrayOrder && arrayOrder)

    return (
        <>
           <article className="flex justify-center items-centerw-full ">
                <section className=" bg-white w-full rounded-2xl flex items-center p-3 justify-between">
                    <div className="flex bg-orange-500 rounded-2xl p-3 gap-1 items-center hover:scale-110 duration-200 cursor-pointer">
                        <AngleUpIcon transform={'rotate(270)'} width={22} height={22} fill={`white`}/>
                        <p className={`text-white text-base font-semibold duration-500`}>Página anterior</p>
                    </div>
                    {

                        Array.from(Array(7)).map((e, index) => {

                            return (
                                <div key={index} className={`flex ${(index) === 1 ? 'bg-orange-500' : 'bg-slate-300'} items-center justify-center rounded-2xl py-[.6rem] px-[1.1rem] gap-1 hover:scale-110 duration-200 cursor-pointer`}>
                                    <p className={`text-white text-2xl font-bold duration-500`}>{index}</p>
                                </div>
                            )
                         })
                    }
                    

                    <div className="flex bg-orange-500 rounded-2xl p-3 gap-1 items-center  hover:scale-110 duration-200 cursor-pointer">
                        <p className={`text-white text-base font-semibold duration-500`}>Página seguinte</p>
                        <AngleUpIcon transform={'rotate(90)'} width={22} height={22} fill={`white`}/>
                    </div>
                </section>
            </article>
        </>
    )
}
