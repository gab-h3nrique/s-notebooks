
/* components */

import { Key, ReactElement, ReactNode, useEffect, useState } from "react";
import ReactDom from "react-dom";
import Api from "../../../lib/api";
import { ClientType } from "../../types/clientType";
import { AccessoriesType, EquipmentType, OrderInfoType } from "../../types/orderType";
import { ServiceOrderType, ServiceType } from "../../types/service";
import { UserType } from "../../types/userType";
import CheckDouble from "../icons/CheckDouble";
import CheckIcon from "../icons/CheckIcon";
import CircleCheckIcon from "../icons/CircleCheckIcon";
import CircleIcon from "../icons/CircleIcon";
import CloseIcon from "../icons/CloseIcon";
import DescktopIcon from "../icons/DescktopIcon";
import IconComponent from "../icons/IconComponent";
import PasteIcon from "../icons/PasteIcon";
import PlusIcon from "../icons/PlusIcon";
import SpinnerIcon from "../icons/SpinnerIcon";
import UserPenIcon from "../icons/UserPenIcon";
import ModalComponent from "./ModalComponent";

/* components */

export interface Props {
    id?: number | null
    isOpen: boolean;
    onClose: any;
    orderHandle:any;
}

const NewOrderModal = ({isOpen, onClose, id, orderHandle}:Props) => {
    const [portal, setPortal] = useState<HTMLElement>()

    const [userArray, setUserArray] = useState<UserType[]>()
    const [serviceArray, setServiceArray] = useState<ServiceType[]>()

    const [client, setClient] = useState<ClientType>({name: "", document: "", email: "", number: "", cep: "", info: ""})
    const [equipament, setEquipament] = useState<EquipmentType>({name: "", serialNumber: "", brand: "", model: ""})
    const [accessories, setAccessories] = useState<AccessoriesType>({charger: false, battery: false, energyCable: false, bag: false, others: ""})
    const [orderInfo, setOrderInfo] = useState<OrderInfoType>({backup: false, backupDescription: "", defectDescription: "", technicalReport: "", generalDescription: "", deliveryConfirmation: false, userId: null, status: "", equipamentPassword: ""})

    const [newService, setNewService] = useState<ServiceOrderType>({id: undefined, name:"", status: "", orderId: null, value: 0})
    const [services, setArrayservices] = useState<ServiceOrderType[]>([])

    const [dropdownEquipament, setDropdownEquipament] = useState<boolean>(false)
    const [dropdownOrderInfo, setDropdownOrderInfo] = useState<boolean>(false)
    const [dropdownStatus, setDropdownStatus] = useState<boolean>(false)
    
    const [dropdownNameService, setDropdownNameService] = useState<boolean>(false)
    const [dropdownStatusService, setDropdownStatusService] = useState<boolean>(false)


    const [loading, setLoading] = useState<boolean>(false)


    const getOrderById = async(id:number | null | undefined) => {
        if(!id) return;

        const {response} = await Api.get('/api/auth/orders', {id:id})
        
        if(!response.id) return;

        setClient({...client, ...response.client})
        setEquipament({...response})
        setAccessories({...response})
        setOrderInfo({...response})
        setArrayservices(response.services)
    }

    const getUsers = async() => {
        const {response:user} = await Api.get('/api/auth/users')

        return user
    }

    const getServices = async() => {
        const {response:services} = await Api.get('/api/auth/services')
        return services
    }



    const saveOrder = async() => {
        setLoading(true)
        const { response } = await Api.post('/api/auth/orders', {client, equipament, accessories, orderInfo, services})
        
        if(response) {
            await orderHandle()
            setLoading(false)
        }
    }

    const handleSearchClient = async(param:string) => {
        const {response} = await Api.get('/api/auth/search/clients', { content: param })
        if(response.id) setClient({...client, ...response})
    }

    const addServiceOrder = () => {
        if(!newService.name || !newService.status) return;
        setArrayservices( services => [...services, newService])
        setNewService({id: undefined, name:"", status: "", orderId: null, value: 0})
    }
    const removeServiceorder = (service:ServiceOrderType) => {
        setArrayservices( services.filter((item)=>item !== service ))
    }
    
    useEffect(()=>{
        if (typeof window !== "undefined") {
            setPortal(document.getElementById('portal') as HTMLElement);
        }
    },[])

    useEffect(()=>{

        if(isOpen) {

            (async()=>{
                setUserArray(await getUsers())
                setServiceArray(await getServices())
                getOrderById(id)
            })()

        } else {

            clearModal()
        }

    },[isOpen])

    function clearModal() {
        console.log('limpou')
        setLoading(false)
        setClient({name: "", document: "", email: "", number: "", cep: "", info: ""})
        setEquipament({name: "", serialNumber: "", brand: "", model: ""})
        setAccessories({charger: false, battery: false, energyCable: false, bag: false, others: ""})
        setOrderInfo({id: null, backup: false, backupDescription: "", defectDescription: "", technicalReport: "", generalDescription: "", deliveryConfirmation: false, userId: null, status: "", equipamentPassword: ""})
        setArrayservices([])
        setNewService({id: undefined, name:"", status: "", orderId: null, value: 0})
    }

    return (
        portal ? ReactDom.createPortal(
            <>
                <ModalComponent close={onClose} open={isOpen} className={``}>
                    {/* <div className="flex flex-col bg-gray-200 w-[32rem] h-[50rem] rounded-2xl p-4 gap-4"> */}
                    <div onClick={(()=>{
                            if(dropdownEquipament || dropdownOrderInfo || dropdownNameService || dropdownStatusService) {
                                setDropdownOrderInfo(false)
                                setDropdownEquipament(false)
                                setDropdownNameService(false)
                                setDropdownStatusService(false)
                            }
                       })} className="flex flex-col bg-slate-100 w-[36rem] h-[56rem] scale-[.93] rounded-2xl py-4 gap-4 overflow-hidden">
                        <header className="px-4">
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
                                            <div onClick={()=> client.document && handleSearchClient(client.document)} className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5 duration-300 hover:scale-110 cursor-pointer`}>
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
                                            <label className="block text-sm font-medium text-slate-500">Senha do equipamento</label>
                                            <input type="text" onChange={(x)=> setEquipament({...equipament, serialNumber: x.target.value})} value={equipament.serialNumber} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
                                        </div> 

                                    </article>

                                    <article>
                                        <div className="flex flex-col gap-2">

                                            <label onClick={()=>console.log('servicos', services)} className="block text-sm font-medium text-slate-500">Serviços</label>

                                            <div className="grid grid-cols-12 gap-2">

                                                <div className="col-span-5 relative" onClick={()=> setDropdownNameService(!dropdownNameService)}>
                                                    <div className="flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150">
                                                        <input onChange={(event)=> setNewService({...newService, name: event.target.value}) } type="text" className={`h-full w-full outline-0 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}  value={newService.name}/>
                                                        <svg className={`-mr-1 ml-2 h-5 w-6 ${dropdownNameService ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                            <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div className="col-span-4 relative" onClick={()=> setDropdownStatusService(!dropdownStatusService)}>
                                                    <div className="flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150">
                                                        <input onChange={(event)=>{setNewService({...newService, status: event.target.value})}} type="text" className={`h-full w-full outline-0 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}  value={newService.status}/>
                                                        <svg className={`-mr-1 ml-2 h-5 w-6 ${dropdownStatusService ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                            <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <input type="number" onChange={(event)=>{setNewService({...newService, value: Number(event.target.value)})}} value={newService.value ? newService.value : ''} className="col-span-2 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Valor"/>

                                                <div onClick={()=>addServiceOrder()} className="flex items-center justify-center  duration-300 hover:scale-110 cursor-pointer">
                                                    <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                                        <PlusIcon width={20} height={20} fill={`white`}/>
                                                    </div>
                                                </div>

                                            </div>
                                            <hr></hr>
                                            {
                                                services.length > 0 && services?.map((item,i)=>{
                                                    return (
                                                        <div key={i} className="grid grid-cols-12 gap-2">
                                                            <input disabled value={item.name} className="col-span-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 opacity-80" />
                                                            <input disabled value={item.status} className="col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 opacity-80" />
                                                            <input disabled value={item.value} className="col-span-2 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 opacity-80" />
                                                            <div onClick={()=>removeServiceorder(item)} className="flex items-center justify-center  duration-300 hover:scale-110 cursor-pointer">
                                                                <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                                                    <CloseIcon width={20} height={20} fill={`white`}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            
                                            <div className={`${!dropdownNameService ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"} duration-150 fixed top-[49%] left-2/4 translate-x-[-50%] translate-y-[-50%] z-10 w-60 h-48 origin-center rounded-md bg-white shadow-2xl overflow-auto cursor-pointer`} >
                                                <div className="py-1" >

                                                    {
                                                        serviceArray?.filter(({name})=>{
                                                            if(newService.name == "") return name;
                                                                else if(name.toLowerCase().includes(newService.name?.toLocaleLowerCase())) return name;
                                                        }).map(({name}, j)=>{
                                                            return <a key={j} onClick={()=>{setDropdownNameService(!dropdownNameService); setNewService({...newService, name: name})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointe rounded-md" >{name}</a>
                                                        })
                                                    }

                                                </div>
                                            </div>

                                            <div className={`${!dropdownStatusService ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"} duration-150 fixed top-[49%] left-2/4 translate-x-[-50%] translate-y-[-50%] z-10 w-32  origin-center rounded-md bg-white shadow-2xl cursor-pointer`} >
                                                <div className="py-1" >

                                                    <a onClick={()=>{setDropdownStatusService(!dropdownStatusService); setNewService({...newService, status: "aberto"})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointe rounded-md" >aberto</a>
                                                    <a onClick={()=>{setDropdownStatusService(!dropdownStatusService); setNewService({...newService, status: "andamento"})}}className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-md" >andamento</a>
                                                    <a onClick={()=>{setDropdownStatusService(!dropdownStatusService); setNewService({...newService, status: "pendente"})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-md" >pendente</a>
                                                    <a onClick={()=>{setDropdownStatusService(!dropdownStatusService); setNewService({...newService, status: "finalizado"})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-md" >finalizado</a>

                                                </div>
                                            </div>

                                            <hr></hr>

                                        </div>

                                    </article>

                                    <article className="grid grid-cols-12 gap-x-2 py-1">
                                    
                                        <div className="col-span-4">
                                            <div >
                                                <label className="block text-sm font-medium text-slate-500">Técnico responsável</label>
                                                <button type="button" onClick={()=> setDropdownOrderInfo(!dropdownOrderInfo)} className="flex justify-between px-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 ">
                                                <label className="block text-sm font-medium text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
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
                                    {!loading ? 
                                        <CheckIcon width={22} height={22} className="fill-white"/> : 
                                        <SpinnerIcon className="h-5 w-5 text-orange-300 fill-white"/>
                                    } 
                                    <p className={`text-white text-sm font-semibold duration-500`}>
                                        {!loading ? 'Salvar ordem de serviço' : 'Salvando . . .'}
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