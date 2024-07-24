import React from 'react'
import { Shelf } from '../../../types/shelf'
import ShelfIcon from '../../icons/ShelfIcon'
import WrenchIcon from '../../icons/WrenchIcon'
import AtendimentoIcon from '../../icons/AtendimentoIcon'
import InfoCard from '../atendimentos/StatusInfo'

interface Props {
    shelf: Shelf;
    onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void
}



function ShelfItem({ shelf, onClick }: Props) {



    return (

        <article onClick={onClick} className={`p-3 gap-3 rounded-lg flex flex-col bg-white w-full h-fit cursor-pointer hover:scale-105 duration-150`}>
            <section className="flex justify-start items-center gap-2">
                {/* <ShelfIcon className="h-4 w- fill-slate-400"/>
                <p className="text-xl text-slate-400 font-bold">{shelf.id ? shelf.id :'●'}</p> */}
                <ShelfIcon className="h-4 w-4 fill-slate-400"/>
                <p className="text-3xl mb-1 text-orange-400 font-bold">{shelf.id ? shelf.id :'●'}</p>
                <p className="text-[.7rem] mt-2 text-slate-400 font-semibold">{shelf.type ? shelf.type :'●'}</p>
            </section>
            <div className="flex gap-2 items-center">
                <section className={`py-1 px-2 rounded-md flex justify-start items-center gap-1 bg-slate-100 w-fit h-fit ${shelf.order ? 'opacity-100' : 'opacity-30'}`}>
                    <AtendimentoIcon className="h-[1rem] w-[1rem] fill-slate-400 group-hover:fill-orange-500 duration-150"/>
                    <p className={`text-[1rem] text-slate-400 font-semibold`}>{shelf.order && shelf.order.id ? shelf.order.id :''}</p>
                </section>
                <Status status={shelf.order && shelf.order.status} />
            </div>
            <section className={`py-1 px-2 rounded-md flex justify-start items-center gap-1 bg-slate-100 w-fit h-fit ${!shelf.user || !shelf.user.name ? 'opacity-50' : ''}`}>
                <WrenchIcon className="h-[.7rem] w-[.7rem] fill-slate-400 group-hover:fill-orange-500 duration-150"/>
                <p className="text-[.7rem] text-slate-400 font-semibold">{shelf.user && shelf.user.name ? shelf.user.name :'nao-atribuido'}</p>
            </section>
        </article>

    )
}

export default ShelfItem



function Status({ status }: any) {

    if(!status) return <></>

    return (
        <section className={`py-1 px-2 rounded-md flex justify-start items-center gap-1 w-fit h-fit ${
            status === 'aguardando' ? 'bg-cyan-100' :
            status === 'aprovado' ? 'bg-indigo-100' :
            status === 'reprovado' ? 'bg-yellow-100' :
            status === 'finalizado' ? 'bg-emerald-100' :
            'bg-gray-100'
        }`}>
            <p className={`text-[.6rem] font-bold opacity-70 ${
                    status === 'aguardando' ? 'text-cyan-700' :
                    status === 'aprovado' ? 'text-indigo-700' :
                    status === 'reprovado' ? 'text-yellow-700' :
                    status === 'finalizado' ? 'text-emerald-700' : 
                    'text-gray-700'
            }`}>{status}</p>
        </section>
    )

}
