/* components */

import Api from "../../../../lib/api";
import { timeDifference } from "../../../../lib/timeDifference";
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

    const { days } = timeDifference(order.createdAt)

    return (
        <>
            <div className={`flex items-center justify-between gap-2 ${background ? 'bg-white': 'bg-slate-100'} w-full h-fit p-2 rounded-2xl cursor-pointer opacity-75 hover:opacity-100 hover:scale-x-95 duration-300`}>
                
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
                            days >= 4 ? 'text-red-700' : 
                            days <= 3 && order.status === 'aprovado' ? 'text-emerald-700' :
                            days <= 3 && order.status === 'agurdando' ? 'text-blue-700' :
                            days <= 3 && order.status !== 'agurdando' && order.status !== 'aprovado' ? 'text-yellow-700' :
                            'text-black-700'
                        }`} 
                        backgroundColor={`${
                            days >= 4 ? 'bg-red-100' : 
                            days <= 3 && order.status === 'aprovado' ? 'bg-emerald-100' :
                            days <= 3 && order.status === 'agurdando' ? 'bg-blue-100' :
                            days <= 3 && order.status !== 'agurdando' && order.status !== 'aprovado' ? 'bg-yellow-100' :
                            'bg-black-100'
                        }`}  status={creationTime(order.createdAt)} 
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

function creationTime(startParam:string | number, endParam?:string | number) {

    const start = new Date(startParam);
    const end = endParam ? new Date(endParam) : null;

    const time1 = start.getTime();
    const time2 = end ? end.getTime() : Date.now();

    const diff = time2 - time1;

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const years = Math.floor(months / 12);

    if(years > 0) return `há ${years} ano${years > 1 ? "s" : ""}`;
    if(years == 0 && months > 0) return `há ${months} mese${months > 1 ? "s" : ""}`;
    if(months == 0 && days > 0) return `há ${days} dia${days > 1 ? "s" : ""}`;
    if(days == 0 && hours > 0) return `há ${hours} hora${hours > 1 ? "s" : ""}`;
    if(hours == 0 && minutes > 0) return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    if(minutes == 0) return `há ${seconds} segundos`;

    return 'não estimado';

}