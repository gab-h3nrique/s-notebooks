
/* components */

import { Key, ReactElement, ReactNode, useEffect, useState } from "react";
import ReactDom from "react-dom";
import BadgeCheckIcon from "../icons/BadgeCheckIcon";
import CheckDouble from "../icons/CheckDouble";
import CircleCheckIcon from "../icons/CircleCheckIcon";
import CircleIcon from "../icons/CircleIcon";
import CloseIcon from "../icons/CloseIcon";
import DescktopIcon from "../icons/DescktopIcon";
import IconComponent from "../icons/IconComponent";
import PasteIcon from "../icons/PasteIcon";
import UserPenIcon from "../icons/UserPenIcon";
import ModalComponent from "./ModalComponent";

/* components */

export interface Props {
    isOpen: boolean;
    onClose: any;
    formOder: FormOrder
}
export interface FormOrder {
    name: string
}
type Checkbox = {
    carregador: boolean;
    bateria: boolean;
    cordaDeForca: boolean;
    bolsa: boolean;
}

const NewOrderModal = ({isOpen, onClose, formOder}:Props) => {
    const [info , setInfo] = useState<Checkbox>({carregador: false, bateria: false, cordaDeForca: false, bolsa: false})
    if(!isOpen) return null

    return ReactDom.createPortal(
        <>
            <ModalComponent close={onClose} className={`opacity-100 duration-100`}>
                {/* <div className="flex flex-col bg-gray-200 w-[32rem] h-[50rem] rounded-2xl p-4 gap-4"> */}
                <div className="flex flex-col bg-slate-100 w-[36rem] h-fit rounded-2xl py-4 gap-4">
                    <header className="px-4">
                        <section className="flex w-full justify-between">
                            <div className="flex justify-center items-center">
                                <p onClick={() => console.log('teste')} className="text-2xl text-slate-500 font-semibold">Ordem de serviço</p>
                            </div>
                            <div onClick={onClose} className="flex items-center justify-center  duration-300 hover:scale-110 cursor-pointer">
                                <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                    <CloseIcon width={22} height={22} fill={`white`}/>
                                </div>
                            </div>
                        </section>
                    </header>
                    <main className="flex flex-col bg-white px-4 py-2 gap-2 overflow-auto ">

                        <section className="flex flex-col gap-1">

                            <header  className="flex justify-start items-center gap-2">
                                <UserPenIcon width={20} height={20} fill={`#94a3b8`}/>
                                <p className="text-lg text-slate-500 font-semibold">Cliente</p>
                            </header>
                            
                            <div className="grid gap-2 grid-cols-8">
    
                                <div className="col-span-5">
                                        <label className="block text-sm font-medium text-slate-500">Nome do cliente</label>
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Nome" required/>
                                </div> 

                                <div className="col-span-3">
                                    <label className="block text-sm font-medium text-slate-500">Documento</label>
                                    <div className="flex justify-center items-center gap-1">
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="000-000-000-00" required/>
                                        <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5 duration-300 hover:scale-110 cursor-pointer`}>
                                            <IconComponent width={20} height={19} fill={`white`}>
                                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
                                            </IconComponent>
                                        </div>
                                    </div>
                                </div>
         
                            </div>
                            <div className="grid gap-2 grid-cols-8">

                                <div className="col-span-5">
                                        <label className="block text-sm font-medium text-slate-500">Email</label>
                                        <input type="email"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="email@exemplo.com" required/>
                                </div>
                                <div className="col-span-3">
                                        <label  className="block text-sm font-medium text-slate-500">Número telefone</label>
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="(00) 0000-0000" required/>
                                </div>

                            </div>

                            <div className="grid gap-2 grid-cols-8">

                                <div className="col-span-3">
                                    <label className="block text-sm font-medium text-slate-500">Cep</label>
                                    <div className="flex justify-center items-center gap-1">
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="000-000-000-00" required/>
                                        <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5 duration-300 hover:scale-110 cursor-pointer`}>
                                            <IconComponent width={20} height={19} fill={`white`}>
                                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
                                            </IconComponent>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-5">
                                    <label className="block text-sm font-medium text-slate-500">Endereço</label>
                                    <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Rua Paraíba, Savassi, Belo Horizonte/MG" required/>
                                </div>


                            </div>

                        </section>
                        <hr></hr>
                        <section className="flex flex-col gap-1">

                            <header  className="flex justify-start items-center gap-2">
                                <DescktopIcon width={20} height={20} fill={`#94a3b8`}/>
                                <p className="text-lg text-slate-500 font-semibold">Equipamento</p>
                            </header>
                            
                            <div className="grid gap-2 grid-cols-2">
    
                                <div >
                                        <label className="block text-sm font-medium text-slate-500">Nome do equipamento</label>
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="" required/>
                                </div> 
                                <div >
                                        <label className="block text-sm font-medium text-slate-500">Número de série</label>
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="" required/>
                                </div> 

                                <div >
                                        <label className="block text-sm font-medium text-slate-500">Fabricante</label>
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="" required/>
                                </div> 

                                <div >
                                        <label className="block text-sm font-medium text-slate-500">Modelo</label>
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="" required/>
                                </div> 
         
                            </div>
                           
                            <article className="flex flex-col gap-1 select-none">

                                <header  className="flex justify-start items-center gap-2">
                                    <CheckDouble width={18} height={18} fill={`#94a3b8`}/>
                                    <p className="text-base text-slate-500 font-semibold">Acessórios</p>
                                </header>
                                
                                <div className="flex flex-col gap-2 ">
        
                                    <article className="flex justify-between gap-2">
                                        <div onClick={()=>setInfo({...info, carregador: !info.carregador})} className={`flex items-center ${info.carregador ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                            {info.carregador ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                    : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                            <label  className={`text-sm text-slate-500  ${info.carregador ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Carregador</label>
                                        </div>
                                        <div onClick={()=>setInfo({...info, bateria: !info.bateria})} className={`flex items-center ${info.bateria ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                            {info.bateria ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                    : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                            <label  className={`text-sm text-slate-500  ${info.bateria ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Bateria</label>
                                        </div>
                                        <div onClick={()=>setInfo({...info, cordaDeForca: !info.cordaDeForca})} className={`flex items-center ${info.cordaDeForca ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                            {info.cordaDeForca ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                    : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                            <label  className={`text-sm text-slate-500  ${info.cordaDeForca ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Corda de força</label>
                                        </div>
                                        <div onClick={()=>setInfo({...info, bolsa: !info.bolsa})} className={`flex items-center ${info.bolsa ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                            {info.bolsa ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                    : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                            <label  className={`text-sm text-slate-500  ${info.bolsa ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Bolsa</label>
                                        </div>

                                    </article>
                                
                                    <div >
                                        <label className="block text-sm font-medium text-slate-500">Outros</label>
                                        <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="" required/>
                                    </div>
            
                                </div>
                            
                            </article>

                        </section>
                        <hr></hr>
                        <section className="flex flex-col gap-1">

                            <header  className="flex justify-start items-center gap-2">
                                <PasteIcon width={20} height={20} fill={`#94a3b8`}/>
                                <p className="text-lg text-slate-500 font-semibold">Informações</p>
                            </header>
                            
                            <div className="flex flex-col">

                                    <article className="grid gap-2 grid-cols-8 py-1">

                                        <div className="col-span-2 flex flex-col gap-1">
                                            <label className="block text-sm font-medium text-slate-500">Backup</label>
                                            <div onClick={()=>setInfo({...info, carregador: !info.carregador})} className={`flex items-center ${info.carregador ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                {info.carregador ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                        : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                <label  className={`text-sm text-slate-500  ${info.carregador ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Fazer backup</label>
                                            </div>
                                        </div>
                                        <div className="col-span-6 flex items-end py-[2.1px]">
                                            {/* <label className="block text-sm font-medium text-slate-500">&nbsp;</label> */}
                                            <input type="text"  className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Descrição do backup" required/>
                                        </div>

                                        

                                    </article>

                                    <div className="col-span-8">
                                            <label className="block text-sm font-medium text-slate-500">Relatório do cliente</label>
                                            <textarea className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="" required/>
                                        </div> 

                                        <div className="col-span-8">
                                            <label className="block text-sm font-medium text-slate-500">Laudo técnico</label>
                                            <textarea className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="" required/>
                                        </div> 

                                        <div className="col-span-8">
                                            <label className="block text-sm font-medium text-slate-500">Serviços</label>
                                            <textarea className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="" required/>
                                        </div> 
                                    
            
                                </div>

                        </section>
                    </main>
                    <footer>

                    </footer>
                </div>
            </ModalComponent>
        </>,
        document.getElementById('portal') as HTMLElement
    )
}
export default NewOrderModal;