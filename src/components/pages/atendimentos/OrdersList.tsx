/* components */

import Api from "../../../../lib/api";
import { timeDifference } from "../../../../lib/timeDifference";
import CloseIcon from "../../icons/CloseIcon";
import DescktopIcon from "../../icons/DescktopIcon";
import ShelfIcon from "../../icons/ShelfIcon";
import TagIcon from "../../icons/TagIcon";
import UserIcon from "../../icons/UserIcon";
import StatusInfo from "./StatusInfo";
import WrenchIcon from "../../icons/WrenchIcon";
import CalendarIcon from "../../icons/CalendarIcon";

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
    onDelete: any;
    background: boolean;
    layout: boolean
}

export default function OrderList({order, onClick, onDelete, background, layout} :ListProps) {

    const { days } = timeDifference(order.createdAt)
    
    return (
        <>
            {
                !layout ?

                    <div className={`flex items-center justify-between gap-2 ${background ? 'bg-white': 'bg-slate-100'} w-full h-fit p-2 rounded-2xl cursor-pointer opacity-75 hover:opacity-100 hover:scale-x-[.97] duration-300`}>
                        
                        <section onClick={onClick} className="flex w-36 rounded-lg justify-start px-1 items-center gap-2">
                            <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                <TagIcon width={18} height={18} fill={`white`}/>
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="text-lg text-orange-500 font-bold">{order.id}</p>
                            </div>

                        </section>

                        <section onClick={onClick} className="flex w-32 rounded-lg justify-start px-1 items-center gap-2">

                            <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-[6px]`}>
                                <ShelfIcon className="h-3 w-3 fill-white"/>
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="text-base text-slate-400 font-bold">{order.shelfId ? order.shelfId :'●'}</p>
                            </div>
                        </section>

                        <section onClick={onClick} className="grid gap-2 grid-cols-8 w-full">
                        

                            <article className="flex justify-start items-center gap-2 col-span-2">
                                <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-1.5`}>
                                    <DescktopIcon width={16} height={16} fill={`white`}/>
                                </div>
                                <div className="flex justify-center items-center overflow-hidden">
                                    <p className="text-base text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{order.model ? order.model : 'Outros'}</p>
                                </div>
                            </article>

                            <article className="flex justify-start items-center gap-2 col-span-2">
                                <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-1.5`}>
                                    <UserIcon width={16} height={16} fill={`white`}/>
                                </div>
                                <div className="flex justify-center items-center overflow-hidden">
                                    <p className="text-base text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{order.client.name}</p>
                                </div>
                            </article>

                            <article className="flex justify-start items-center gap-2 col-span-2">
                                <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-[6px]`}>
                                    <WrenchIcon className="h-3 w-3 fill-white"/>
                                </div>
                                <div className="flex justify-center items-center overflow-hidden">
                                    <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{order.user.name}</p>
                                </div>
                            </article>

                            <article className="flex justify-start items-center gap-2 col-span-2">
                                <CalendarIcon className="h-[14px] w-[14px] fill-slate-400"/>
                                <div className="flex justify-center items-center overflow-hidden">
                                    <p className="text-xs text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{ brDate(order.createdAt) }</p>
                                </div>
                            </article>

                        </section>

                        <section className="flex w-48 justify-end items-center gap-2">
                            
                            <StatusInfo
                            textColor={`${

                                order.status === 'finalizado' ? 'text-slate-700' :
                                order.status === 'arquivado' ? 'text-slate-700' :

                                days >= 4 && order.status !== 'finalizado' && order.status !== 'arquivado' ? 'text-red-700' :
                                days == 3 && order.status !== 'finalizado' && order.status !== 'arquivado' ? 'text-yellow-700' :

                                days < 3 && order.status === 'aprovado' ? 'text-emerald-700' :
                                days < 3 && order.status === 'aguardando' ? 'text-sky-700' :

                                'text-indigo-700'
                                }`} 
                                backgroundColor={`${

                                    order.status === 'finalizado' ? 'bg-slate-100' :
                                    order.status === 'arquivado' ? 'bg-slate-100' :

                                    days >= 4 && order.status !== 'finalizado' && order.status !== 'arquivado' ? 'bg-red-100' :
                                    days == 3 && order.status !== 'finalizado' && order.status !== 'arquivado' ? 'bg-yellow-100' :

                                    days < 3 && order.status === 'aprovado' ? 'bg-emerald-100' :
                                    days < 3 && order.status === 'aguardando' ? 'bg-sky-100' :

                                    'bg-indigo-100'
                                }`}  status={creationTime(order.createdAt)}
                            />

                            <StatusInfo
                                textColor={`${
                                    order.status === 'aguardando' ? 'text-cyan-700' :
                                    order.status === 'aprovado' ? 'text-indigo-700' :
                                    order.status === 'reprovado' ? 'text-yellow-700' :
                                    order.status === 'finalizado' ? 'text-emerald-700' :
                                    'text-gray-700'
                                }`} 
                                backgroundColor={`${
                                    order.status === 'aguardando' ? 'bg-cyan-100' :
                                    order.status === 'aprovado' ? 'bg-indigo-100' :
                                    order.status === 'reprovado' ? 'bg-yellow-100' :
                                    order.status === 'finalizado' ? 'bg-emerald-100' : 
                                    'bg-gray-100'
                                }`}  status={order.status} 
                            />

                                <div /* onClick={onDelete}*/ className={`flex bg-slate-400 w-fit h-fit rounded-lg p-[.3rem] opacity-70 hover:bg-red-500 hover:opacity-90 hover:scale-110`}>

                                    {/* <CloseIcon className="h-[15px] w-[15px] fill-white"/> */}

                                </div>
                        </section>

                        

                    </div>

                :
                
                    <div className={`flex items-center justify-between gap-2 w-full h-fit p-2 cursor-pointer opacity-75 duration-300
                        ${

                            order.status === 'finalizado' ? 'bg-white' :
                            order.status === 'arquivado' ? 'bg-white' :

                            days >= 4 && order.status !== 'finalizado' && order.status !== 'arquivado' ? 'bg-red-700' :
                            days == 3 && order.status !== 'finalizado' && order.status !== 'arquivado' ? 'bg-yellow-700' :

                            days < 3 && order.status === 'aprovado' ? 'bg-emerald-700' :
                            days < 3 && order.status === 'aguardando' ? 'bg-sky-700' :

                            'bg-indigo-700'
                        }
                    `}>
                        
                        <section onClick={onClick} className="flex w-36  justify-start px-1 items-center gap-2">
                            {/* <div className={`flex bg-black w-fit h-fit  p-1.5`}>
                                <TagIcon width={15} height={15} fill={`white`}/>
                            </div> */}
                            <b>N° os:</b>
                            <div className="flex justify-center items-center">
                                <p className="text-lg text-black">{order.id}</p>
                            </div>

                        </section>

                        <section onClick={onClick} className="flex w-32  justify-start px-1 items-center gap-2">

                            {/* <div className={`flex bg-black w-fit h-fit  p-[6px]`}>
                                <ShelfIcon className="h-3 w-3 fill-white"/>
                            </div> */}
                            <b>Prateleira:</b>
                            <div className="flex justify-center items-center">
                                <p className="text-base text-black font-bold">{order.shelfId ? order.shelfId :'●'}</p>
                            </div>
                        </section>

                        <section onClick={onClick} className="grid gap-2 grid-cols-8 w-full">
                        

                            <article className="flex justify-start items-center gap-2 col-span-2">
                                {/* <div className={`flex bg-black w-fit h-fit  p-1.5`}>
                                    <DescktopIcon width={16} height={16} fill={`white`}/>
                                </div> */}
                                <b>Equipamento:</b>
                                <div className="flex justify-center items-center overflow-hidden">
                                    <p className="text-base text-black ">{order.model ? order.model : 'Outros'}</p>
                                </div>
                            </article>

                            <article className="flex justify-start items-center gap-2 col-span-2">
                                {/* <div className={`flex bg-black w-fit h-fit  p-1.5`}>
                                    <UserIcon width={16} height={16} fill={`white`}/>
                                </div> */}
                                <b>Cliente</b>
                                <div className="flex justify-center items-center overflow-hidden">
                                    <p className="text-base text-black">{order.client.name}</p>
                                </div>
                            </article>

                            <article className="flex justify-start items-center gap-2 col-span-2">
                                {/* <div className={`flex bg-black w-fit h-fit  p-[6px]`}>
                                    <WrenchIcon className="h-3 w-3 fill-white"/>
                                </div> */}
                                <b>Técnico</b>
                                <div className="flex justify-center items-center overflow-hidden">
                                    <p className="text-sm text-black">{order.user.name}</p>
                                </div>
                            </article>

                            <article className="flex justify-start items-center gap-2 col-span-2">
                                {/* <CalendarIcon className="h-[14px] w-[14px] fill-black"/> */}
                                <div className="flex justify-center items-center overflow-hidden">
                                    <p className="text-sm text-black">{ brDate(order.createdAt) }</p>
                                </div>
                            </article>

                        </section>

                        <section className="flex w-48 justify-end items-center gap-2">
                            
                            <p>{order.status}</p>

                            {/* <div 
                            onClick={onDelete}
                            className={`flex bg-slate-400 w-fit h-fit  p-[.3rem] opacity-70 hover:bg-red-500 hover:opacity-90 hover:scale-110`}>

                                <CloseIcon className="h-[15px] w-[15px] fill-white"/>

                            </div> */}

                        </section>

                        

                    </div>

            }
            
        </>
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
    if(years == 0 && months > 0) return `há ${months} mes${months > 1 ? "ses" : ""}`;
    if(months == 0 && days > 0) return `há ${days} dia${days > 1 ? "s" : ""}`;
    if(days == 0 && hours > 0) return `há ${hours} hora${hours > 1 ? "s" : ""}`;
    if(hours == 0 && minutes > 0) return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    if(minutes == 0) return `há ${seconds} segundos`;

    return 'não estimado';

}

function brDate(date:any){ return (new Date(date)).toLocaleDateString('pt-BR')}
