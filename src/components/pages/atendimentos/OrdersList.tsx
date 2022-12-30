/* components */

import Api from "../../../../lib/api";
import { ClientType } from "../../../types/clientType";
import { OrderType } from "../../../types/orderType";
import DescktopIcon from "../../icons/DescktopIcon";
import FileDownIcon from "../../icons/FileDownIcon";
import TagIcon from "../../icons/TagIcon";
import UserIcon from "../../icons/UserIcon";
import StatusInfo from "./StatusInfo";

/* components */

export interface OrderListProps {
    onClick: any;
    osNumber: number;
    clientName: string;
    clientDocument: string
    deviceName: string;
    osStatus: string;
    background: boolean;
}

export interface ListProps {
    order: any;
    onClick: any;
    background: boolean;
}

export default function OrderList({order, onClick, background} :ListProps) {

    return (
        <>
            <div className={`flex items-center justify-between gap-2 ${background ? 'bg-white': 'bg-slate-100'}  w-full h-fit p-2 rounded-2xl cursor-pointer  opacity-75 hover:opacity-100 duration-300`}>
                
                <section onClick={onClick} className="flex w-36 rounded-lg justify-start px-1 items-center gap-2">
                    <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                        <TagIcon width={18} height={18} fill={`white`}/>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-lg text-orange-500 font-bold">{order.id}</p>
                    </div>
                </section>

                <section onClick={onClick} className="grid gap-2 grid-cols-6 w-full">
                

                    <article className="flex justify-start items-center gap-2 col-span-2">
                        <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-1.5`}>
                            <DescktopIcon width={16} height={16} fill={`white`}/>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-base text-slate-600 font-semibold">{order.name}</p>
                        </div>
                    </article>

                    <article className="flex justify-start items-center gap-2 col-span-4">
                        <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-1.5`}>
                            <UserIcon width={16} height={16} fill={`white`}/>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <p className="text-sm text-slate-600 font-semibold">{order.client.name}</p>
                            <p className="text-xs text-slate-500 font-semibold">cpf: {order.client.document}</p>
                        </div>
                    </article>

                </section>

                <section className="flex w-48 justify-end items-center gap-2">
                    
                    <StatusInfo
                    textColor={`${
                            order.status === 'finalizado' ? 'text-emerald-700' : 
                            order.status === 'andamento' ? 'text-indigo-700' :
                            order.status === 'pendente' ? 'text-yellow-700' :
                            order.status === 'aberto' ? 'text-cyan-700' :
                            'text-indigo-700'
                        }`} 
                        backgroundColor={`${
                            order.status === 'finalizado' ? 'bg-emerald-100' : 
                            order.status === 'andamento' ? 'bg-indigo-100' :
                            order.status === 'pendente' ? 'bg-yellow-100' :
                            order.status === 'aberto' ? 'bg-cyan-100' :
                            'bg-indigo-100'
                        }`}  status={'há 5 dias'} 
                    />

                    <StatusInfo
                        textColor={`${
                            order.status === 'finalizado' ? 'text-emerald-700' : 
                            order.status === 'andamento' ? 'text-indigo-700' :
                            order.status === 'pendente' ? 'text-yellow-700' :
                            order.status === 'aberto' ? 'text-cyan-700' :
                            'text-indigo-700'
                        }`} 
                        backgroundColor={`${
                            order.status === 'finalizado' ? 'bg-emerald-100' : 
                            order.status === 'andamento' ? 'bg-indigo-100' :
                            order.status === 'pendente' ? 'bg-yellow-100' :
                            order.status === 'aberto' ? 'bg-cyan-100' :
                            'bg-indigo-100'
                        }`}  status={order.status} 
                    />

                    <div  onClick={()=>{window.open(`/orderPdf?id=${order.id}`)}} className="flex justify-center items-center hover:scale-105 hover:bg-slate-200 p-2 rounded-lg">
                        <FileDownIcon className={`h-6 w-8 fill-slate-400`} />
                    </div>
                </section>

                

            </div>
        </>
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
    )
}