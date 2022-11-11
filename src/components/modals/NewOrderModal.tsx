
/* components */

import { Key, ReactElement, ReactNode, useEffect, useState } from "react";
import ReactDom from "react-dom";
import Api from "../../../lib/api";
import CheckDouble from "../icons/CheckDouble";
import CheckIcon from "../icons/CheckIcon";
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
}

interface Client {
    name: string;
    document: string;
    email: string;
    number: string;
    cep: string;
    info: string;
}
interface Equipment {
    name: string;
    serialNumber?: string;
    brand: string;
    model: string;
}
interface Accessories {
    charger: boolean;
    battery: boolean;
    energyCable: boolean;
    bag: boolean;
    others: string;
}
interface OrderInfo {
    backup: boolean;
    backupDescription?: string;
    defectDescription?: string;
    technicalReport?: string;
    generalDescription?: string;
    deliveryConfirmation: boolean;
    userId?: number | null;
    status: string;
}
interface User {
    id: number;
    name: string;
    email: string;
    role: number
} 



const NewOrderModal = ({isOpen, onClose}:Props) => {

    const getUsers = async() => {

        const {response:user} = await Api.get('/api/auth/users')

        return user
    }

    const saveOrder = async() => {
        console.log('slkdfjlkasdflkdfjlksldf')
        const response = await Api.post('/api/auth/orders', {client, equipament, accessories, orderInfo})
    }

    const [portal, setPortal] = useState<HTMLElement>()
    useEffect(()=>{
        if (typeof window !== "undefined") {
            setPortal(document.getElementById('portal') as HTMLElement);
            (async()=>{
                setUserArray(await getUsers())
            })()
        }
    },[])
    

    const [client, setClient] = useState<Client>({name: "", document: "", email: "", number: "", cep: "", info: ""})

    const [equipament, setEquipament] = useState<Equipment>({name: "", serialNumber: "", brand: "", model: ""})
    const [dropdownEquipament, setDropdownEquipament] = useState<boolean>(false)

    const [accessories, setAccessories] = useState<Accessories>({charger: false, battery: false, energyCable: false, bag: false, others: ""})

    const [orderInfo, setOrderInfo] = useState<OrderInfo>({backup: false, backupDescription: "", defectDescription: "", technicalReport: "", generalDescription: "", deliveryConfirmation: false, userId: null, status: ""})
    const [dropdownOrderInfo, setDropdownOrderInfo] = useState<boolean>(false)
    const [dropdownStatus, setDropdownStatus] = useState<boolean>(false)

    const [userArray, setUserArray] = useState<User[]>()
    console.log('render')
    return (
        portal ? ReactDom.createPortal(
            <>
                <ModalComponent close={onClose} open={isOpen} className={``}>
                    {/* <div className="flex flex-col bg-gray-200 w-[32rem] h-[50rem] rounded-2xl p-4 gap-4"> */}
                    <div onClick={(()=>{
                            if(dropdownEquipament || dropdownOrderInfo) {
                                setDropdownOrderInfo(false)
                                setDropdownEquipament(false)
                            }
                       })} className="flex flex-col bg-slate-100 w-[36rem] h-fit scale-[.93] rounded-2xl py-4 gap-4">
                        <header onClick={()=> console.log(userArray)} className="px-4">
                            <section className="flex w-full justify-between">
                                <div className="flex justify-center items-center">
                                    <p className="text-2xl text-slate-500 font-semibold">Ordem de serviço</p>
                                </div>
                                <div onClick={onClose} className="flex items-center justify-center  duration-300 hover:scale-110 cursor-pointer">
                                    <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                        <CloseIcon width={22} height={22} fill={`white`}/>
                                    </div>
                                </div>
                            </section>
                        </header>
                        <div className="flex flex-col bg-white px-4 py-2 gap-2 overflow-auto ">

                            <section className="flex flex-col gap-1">

                                <header  className="flex justify-start items-center gap-2">
                                    <UserPenIcon width={20} height={20} fill={`#94a3b8`}/>
                                    <p onClick={() => console.log('client', client, )} className="text-lg text-slate-500 font-semibold">Cliente</p>
                                </header>
                                
                                <div className="grid gap-2 grid-cols-8">
        
                                    <div className="col-span-5">
                                            <label className="block text-sm font-medium text-slate-500">Nome do cliente</label>
                                            <input type="text" onChange={(x)=> setClient({...client, name: x.target.value})} value={client.name} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Nome" />
                                    </div> 

                                    <div className="col-span-3">
                                        <label className="block text-sm font-medium text-slate-500">Documento</label>
                                        <div className="flex justify-center items-center gap-1">
                                            <input type="text" onChange={(x)=> setClient({...client, document: x.target.value})} value={client.document} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="000-000-000-00"/>
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
                                            <input type="email" onChange={(x)=> setClient({...client, email: x.target.value})} value={client.email} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="email@exemplo.com"/>
                                    </div>
                                    <div className="col-span-3">
                                            <label  className="block text-sm font-medium text-slate-500">Número telefone</label>
                                            <input type="text" onChange={(x)=> setClient({...client, number: x.target.value})} value={client.number} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="(00) 0000-0000"/>
                                    </div>

                                </div>

                                <div className="grid gap-2 grid-cols-8">

                                    <div className="col-span-3">
                                        <label className="block text-sm font-medium text-slate-500">Cep</label>
                                        <div className="flex justify-center items-center gap-1">
                                            <input type="text" onChange={(x)=> setClient({...client, cep: x.target.value})} value={client.cep} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="000-000-000-00"/>
                                            <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5 duration-300 hover:scale-110 cursor-pointer`}>
                                                <IconComponent width={20} height={19} fill={`white`}>
                                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
                                                </IconComponent>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-5">
                                        <label className="block text-sm font-medium text-slate-500">Endereço</label>
                                        <input type="text" onChange={(x)=> setClient({...client, info: x.target.value})} value={client.info} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Rua Paraíba, Savassi, Belo Horizonte/MG"/>
                                    </div>


                                </div>

                            </section>
                            <hr></hr>
                            <section className="flex flex-col gap-1">

                                <header  className="flex justify-start items-center gap-2">
                                    <DescktopIcon width={20} height={20} fill={`#94a3b8`}/>
                                    <p onClick={() => console.log('equipament', equipament )} className="text-lg text-slate-500 font-semibold">Equipamento</p>
                                </header>
                                
                                <div className="grid gap-2 grid-cols-2">
        
                                    <div>
                                        <div onClick={()=> setDropdownEquipament(!dropdownEquipament)}>
                                            <label className="block text-sm font-medium text-slate-500">Tipo de equipamento</label>
                                            <button type="button" className="flex justify-between px-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150">
                                            <label className="block text-sm font-medium text-slate-500">{equipament.name ? equipament.name : ""}</label>
                                            
                                            <svg className={`-mr-1 ml-2 h-5 w-5 ${dropdownEquipament ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                            </svg>
                                            </button>
                                        </div>

                                        <div className={`${!dropdownEquipament ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"} duration-150 absolute  left-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg`} >
                                            <div className="py-1" >

                                                <a onClick={()=>{setDropdownEquipament(!dropdownEquipament); setEquipament({...equipament, name: 'Notebook'})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer" >Notebook</a>
                                                <a onClick={()=>{setDropdownEquipament(!dropdownEquipament); setEquipament({...equipament, name: 'Desktop'})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer" >Desktop</a>
                                                <a onClick={()=>{setDropdownEquipament(!dropdownEquipament); setEquipament({...equipament, name: 'Outros'})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer" >Outros</a>

                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div >
                                            <label className="block text-sm font-medium text-slate-500">Número de série</label>
                                            <input type="text" onChange={(x)=> setEquipament({...equipament, serialNumber: x.target.value})} value={equipament.serialNumber} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
                                    </div> 

                                    <div >
                                            <label className="block text-sm font-medium text-slate-500">Fabricante</label>
                                            <input type="text" onChange={(x)=> setEquipament({...equipament, brand: x.target.value})} value={equipament.brand} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
                                    </div> 

                                    <div >
                                            <label className="block text-sm font-medium text-slate-500">Modelo</label>
                                            <input type="text" onChange={(x)=> setEquipament({...equipament, model: x.target.value})} value={equipament.model} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
                                    </div> 
            
                                </div>
                            
                                <article className="flex flex-col gap-1 select-none">

                                    <header  className="flex justify-start items-center gap-2">
                                        <CheckDouble width={18} height={18} fill={`#94a3b8`}/>
                                        <p onClick={() => console.log('accessories', accessories )} className="text-base text-slate-500 font-semibold">Acessórios</p>
                                    </header>
                                    
                                    <div className="flex flex-col gap-2 ">
            
                                        <article className="flex justify-between gap-2">

                                            <div onClick={()=>setAccessories({...accessories, charger: !accessories.charger})} className={`flex items-center ${accessories.charger ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                {accessories.charger ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                        : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                <label  className={`text-sm text-slate-500  ${accessories.charger ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Carregador</label>
                                            </div>

                                            <div onClick={()=>setAccessories({...accessories, battery: !accessories.battery})} className={`flex items-center ${accessories.battery ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                {accessories.battery ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                        : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                <label  className={`text-sm text-slate-500  ${accessories.battery ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Bateria</label>
                                            </div>
                                            <div onClick={()=>setAccessories({...accessories, energyCable: !accessories.energyCable})} className={`flex items-center ${accessories.energyCable ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                {accessories.energyCable ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                        : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                <label  className={`text-sm text-slate-500  ${accessories.energyCable ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Corda de força</label>
                                            </div>
                                            <div onClick={()=>setAccessories({...accessories, bag: !accessories.bag})} className={`flex items-center ${accessories.bag ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                {accessories.bag ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                        : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                <label  className={`text-sm text-slate-500  ${accessories.bag ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Bolsa</label>
                                            </div>

                                        </article>
                                    
                                        <div >
                                            <label className="block text-sm font-medium text-slate-500">Outros</label>
                                            <input type="text" onChange={(x)=> setAccessories({...accessories, others: x.target.value})} value={accessories.others} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
                                        </div>
                
                                    </div>
                                
                                </article>

                            </section>
                            <hr></hr>
                            <section className="flex flex-col gap-1">

                                <header  className="flex justify-start items-center gap-2">
                                    <PasteIcon width={20} height={20} fill={`#94a3b8`}/>
                                    <p onClick={() => console.log('orderInfo', orderInfo )} className="text-lg text-slate-500 font-semibold">Informações</p>
                                </header>
                                
                                <div className="flex flex-col">

                                    <article className="grid gap-2 grid-cols-8 py-1">

                                        <div className="col-span-2 flex flex-col gap-1">
                                            <label className="block text-sm font-medium text-slate-500"></label>
                                            <div onClick={()=>setOrderInfo({...orderInfo, backup: !orderInfo.backup})} className={`flex items-center ${orderInfo.backup ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                {orderInfo.backup ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                        : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                <label  className={`text-sm text-slate-500  ${orderInfo.backup ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Fazer backup</label>
                                            </div>
                                        </div>
                                        <div className="col-span-6 flex items-end py-[2.1px]">
                                            {/* <label className="block text-sm font-medium text-slate-500">&nbsp;</label> */}
                                            <input type="text" onChange={(x)=> setOrderInfo({...orderInfo, backupDescription: x.target.value})} value={orderInfo.backupDescription} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Descrição do backup"/>
                                        </div>

                                        

                                    </article>
                                    <article className="grid grid-cols-2 gap-x-2">

                                        <div>
                                            <label className="block text-sm font-medium text-slate-500">Relatório do cliente</label>
                                            <textarea onChange={(x)=> setOrderInfo({...orderInfo, defectDescription: x.target.value})} value={orderInfo.defectDescription} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" />
                                        </div> 

                                        <div >
                                            <label className="block text-sm font-medium text-slate-500">Laudo técnico</label>
                                            <textarea onChange={(x)=> setOrderInfo({...orderInfo, technicalReport: x.target.value})} value={orderInfo.technicalReport} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" />
                                        </div> 

                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-slate-500">Serviços</label>
                                            <textarea onChange={(x)=> setOrderInfo({...orderInfo, generalDescription: x.target.value})} value={orderInfo.generalDescription} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" />
                                        </div>

                                    </article>

                                    <article className="grid grid-cols-12 gap-x-2">
                                    
                                        <div className="col-span-4">
                                            <div >
                                                <label className="block text-sm font-medium text-slate-500">Técnico responsável</label>
                                                <button type="button" onClick={()=> setDropdownOrderInfo(!dropdownOrderInfo)} className="flex justify-between px-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150">
                                                <label className="block text-sm font-medium text-slate-500">
                                                    {
                                                        userArray ?
                                                            userArray.map(({id, name})=>{return orderInfo.userId === id ? name : null})
                                                            : null
                                                    }
                                                </label>
                                                
                                                <svg className={`-mr-1 ml-2 h-5 w-5 ${dropdownOrderInfo ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                </svg>
                                                </button>
                                            </div>

                                            <div className={`${!dropdownOrderInfo ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"} duration-150 absolute left-48 bottom-20 z-10  w-56 origin-top-right rounded-md bg-white shadow-2xl`} >
                                                <div className="py-1" >
                                                    <>
                                                        {
                                                            userArray ? 
                                                                userArray.map(({id, name})=>{
                                                                    return <a key={id} onClick={()=>{setDropdownOrderInfo(!dropdownOrderInfo); setOrderInfo({...orderInfo, userId: id}) ; console.log(id, name)}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{name}</a>
                                                                })
                                                                : null
                                                        }
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-3">
                                            <div onClick={()=> setDropdownStatus(!dropdownStatus)}>
                                                <label className="block text-sm font-medium text-slate-500">Status</label>
                                                <button type="button" className="flex justify-between px-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150">
                                                <label className="block text-sm font-medium text-slate-500">{orderInfo.status ? orderInfo.status : ""}</label>
                                                
                                                <svg className={`-mr-1 ml-2 h-5 w-5 ${dropdownStatus ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                    <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                </svg>
                                                </button>
                                            </div>

                                            <div className={`${!dropdownStatus ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"} duration-150 absolute  right-3 bottom-5 z-10  w-56 origin-top-right rounded-md bg-white shadow-2xl`} >
                                                <div className="py-1" >

                                                    <a onClick={()=>{setDropdownStatus(!dropdownStatus); setOrderInfo({...orderInfo, status: "aberto"})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointe rounded-md" >aberto</a>
                                                    <a onClick={()=>{setDropdownStatus(!dropdownStatus); setOrderInfo({...orderInfo, status: "andamento"})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-md" >andamento</a>
                                                    <a onClick={()=>{setDropdownStatus(!dropdownStatus); setOrderInfo({...orderInfo, status: "pendente"})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-md" >pendente</a>
                                                    <a onClick={()=>{setDropdownStatus(!dropdownStatus); setOrderInfo({...orderInfo, status: "finalizado"})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-md" >finalizado</a>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-5 flex items-end py-[2.1px]">
                                            <div onClick={()=>setOrderInfo({...orderInfo, deliveryConfirmation: !orderInfo.deliveryConfirmation})} className={`flex items-center ${orderInfo.deliveryConfirmation ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-105 duration-150 cursor-pointer `}>
                                                {orderInfo.deliveryConfirmation ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                        : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                <label  className={`text-sm text-slate-500  ${orderInfo.deliveryConfirmation ? 'text-orange-500' : 'text-slate-500' } font-semibold cursor-pointer`}>Confirmação de entrega</label>
                                            </div>
                                        </div>

                                        

                                    </article>
                
                                </div>

                            </section>
                        </div>
                        <footer className="flex justify-center items-center">
                            <div onClick={saveOrder} className="flex w-full px-6">
                                <div className={`flex justify-center items-center bg-orange-500 gap-2 cursor-pointer w-full rounded-2xl py-3 px-3 duration-150 hover:scale-y-110`}>
                                        <CheckIcon width={22} height={22} fill={`white`}/>
                                    <p className={`text-white text-sm font-semibold duration-500`}>
                                        Salvar ordem de serviço
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </div>
                </ModalComponent>
            </>,
            portal
        ) : null
    )
}
export default NewOrderModal;