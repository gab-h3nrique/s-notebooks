
/* components */

import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import Api from "../../../lib/api";
import { ClientType } from "../../types/clientType";
import { OrderType } from "../../types/orderType";
import { ServiceType } from "../../types/serviceType";
import { Shelf } from "../../types/shelf";
import { UserType } from "../../types/userType";
import CheckDouble from "../icons/CheckDouble";
import CheckIcon from "../icons/CheckIcon";
import CircleCheckIcon from "../icons/CircleCheckIcon";
import CircleIcon from "../icons/CircleIcon";
import CloseIcon from "../icons/CloseIcon";
import CloudDownload from "../icons/CloudDownload";
import ClouldSetting from "../icons/ClouldSetting";
import DescktopIcon from "../icons/DescktopIcon";
import FileDownIcon from "../icons/FileDownIcon";
import IconComponent from "../icons/IconComponent";
import PasteIcon from "../icons/PasteIcon";
import PlusIcon from "../icons/PlusIcon";
import SpinnerIcon from "../icons/SpinnerIcon";
import UserPenIcon from "../icons/UserPenIcon";
import ModalComponent from "./ModalComponent";
import Pdf from "../icons/Pdf";
import DropDown from "../elements/DropDown";

/* components */

export interface Props {
    id?: number | null
    isOpen: boolean;
    onClose: any;
    orderHandle:any;
}

const emptyOrder :OrderType = {
    id: undefined,
    status: "",
    clientId: undefined,
    userId: undefined,
    shelfId: undefined,            
    model: "",
    brand:"",
    name:"",
    serialNumber:"",
    charger:false,
    battery:false,
    energyCable:false,
    bag:false,
    others:"",
    warranty:false,
    warrantyDescription:"",
    backup:false,
    backupDescription:"",
    defectDescription:"",
    technicalReport:"",
    equipamentPassword:"",
    generalDescription:"",
    deliveryConfirmation:false,
    value:0,
}

interface ServiceOrderType {
    id?: number;
    name: string;
    status: string;
    orderId?: number;
    value: string;
}

const NewOrderModal = ({isOpen, onClose, id, orderHandle}:Props) => {
    const [portal, setPortal] = useState<HTMLElement>()

    const [tryedToSave, setTryedToSave] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const [userArray, setUserArray] = useState<UserType[]>()
    const [serviceArray, setServiceArray] = useState<ServiceType[]>()

    const [clientArray, setClientArray] = useState<ClientType[]>()

    const [client, setClient] = useState<ClientType>({name: "", document: "", email: "", number: "", cep: "", info: ""})

    const [order, setOrder] = useState<OrderType>(emptyOrder)

    const [newService, setNewService] = useState<ServiceOrderType>({id: undefined, name:"", status: "", orderId: undefined, value: ""})
    const [services, setArrayservices] = useState<ServiceOrderType[]>([])
    const [shelf, setShelf] = useState<string>()

    const [dropdownEquipament, setDropdownEquipament] = useState<boolean>(false)
    const [dropdownOrderInfo, setDropdownOrderInfo] = useState<boolean>(false)
    const [dropdownStatus, setDropdownStatus] = useState<boolean>(false)
    
    const [dropdownNameClient, setDropdownNameClient] = useState<boolean>(false)
    const [dropdownNameService, setDropdownNameService] = useState<boolean>(false)
    const [dropdownStatusService, setDropdownStatusService] = useState<boolean>(false)
    const [dropdownShelf, setDropdownShelf] = useState<boolean>(false)

    const [dropdownArrayService, setDropdownArrayService] = useState<any>()

    const [loading, setLoading] = useState<boolean>(false)
    const [contentLoading, setContentLoading] = useState<boolean>(true)


    const getOrderById = async(id:number | null | undefined) => {
        
        if(!id) return setContentLoading(false);
        setContentLoading(true)
        const { response } = await Api.get('/api/auth/orders', {id:id})
        
        if(!response.id) return;
        
        const {user, client, services, shelf, ...allOrder} = response

        allOrder && setOrder(allOrder)
        client && setClient(client)
        services && setArrayservices(services)
        shelf && setShelf(shelf.type)

        setContentLoading(false)
        
    }

    const getUsers = async() => {
        const {response:user} = await Api.get('/api/auth/users')

        return user
    }

    const getClients = async() => {
        const {response:clients} = await Api.get('/api/auth/clients')
        console.log(clients)
        return clients
    }

    const getServices = async() => {
        const {response:services} = await Api.get('/api/auth/services')
        return services
    }

    const handleSearchClient = async(param:string) => {
        const {response} = await Api.get('/api/auth/search/clients', { content: param })
        if(response.id) setClient({...client, ...response})
    }

    const addServiceOrder = async() => {

        if(!newService.name || !newService.status) return;

        if(order.id) await Api.post('/api/auth/servicesOrder', { serviceOrder: {...newService, orderId: order.id}  })

        setArrayservices( services => [...services, newService])
        setNewService({id: undefined, name:"", status: "", orderId: undefined, value: "0"})
    }
    const editeServiceOrder = async(service:ServiceOrderType, index: number) => {

        // if(!service.name || !service.status) return;

        console.log('aqui')

        // if(order.id) await Api.post('/api/auth/servicesOrder', { serviceOrder: {...service, orderId: order.id}  })

        setArrayservices( services => services.map((e, i) => i == index ? ({...service}) : e))

    }

    const removeServiceorder = async(service:ServiceOrderType) => {

        // if(order.id && service.id) await Api.delete('/api/auth/servicesOrder', { id: service.id })

        setArrayservices( services.filter((item)=>item !== service ))
    }

    


    const handleDocument = (e:any) => {
        setClient({...client, document: cpfAndCnpjMask(e.target.value)})
    }

    const handleValue = (e:any) => {

        setNewService({...newService, value: String(brMask(e.target.value))})
        
    }

    const handleNumber = (e:any) => {
        setClient({...client, number: foneMask(e.target.value)})
    }

    const getCep = async() => {
        if(!client.cep) return;

        const address = await Api.get(`https://viacep.com.br/ws/${client.cep}/json/`)

        if(!address.logradouro) return;

        setClient({...client, info: `${address.logradouro}, ${address.bairro}, ${address.localidade}/${address.uf}` })
        console.log(address)

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
                setClientArray(await getClients())
                getOrderById(id)
            })()

        } else {

            clearModal()
        }

    },[isOpen])

    function isEmptyRequiredField():Boolean {

        //client
        if(!client.name || !client.email || !order.userId) return true;

        //order
        if(!order.status || !order.model || !order.brand || !order.equipamentPassword) return true;

        return false;
    }

    const saveOrder = async() => {

        setTryedToSave(true)
        if(isEmptyRequiredField()) return setMessage('Por favor, verifique os campos obrigatórios!'); 

        setLoading(true)

        const { response, ...error } = await Api.post('/api/auth/orders', {order, client, services, shelfType: shelf && shelf})
        
        if(!response) {
            setMessage(error?.message)
            setLoading(false)
            return;
        } 
        
        await orderHandle()
        setLoading(false)
    }

    function clearModal() {
        setOrder(emptyOrder)
        setLoading(false)
        setTryedToSave(false)
        setMessage("")
        setShelf("")
        setContentLoading(true)
        setClient({name: "", document: "", email: "", number: "", cep: "", info: ""})
        setArrayservices([])
        setNewService({id: undefined, name:"", status: "", orderId: undefined, value: "0"})
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
                       })} className="flex flex-col bg-slate-100 max-w-[36rem] max-h-[56rem] rounded-2xl py-4 gap-4 overflow-hidden">
                        <header className="px-4">
                            <section className="flex w-full justify-between">
                                <div onClick={()=>console.log(order)} className="flex justify-center items-center">
                                    <p className="text-2xl text-slate-500 font-semibold">Ordem de serviço</p>
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    {
                                        order.id ?

                                            <>
                                                {/* <div onClick={()=>{window.open(`/orderPdf?id=${order.id}`)}} className="flex items-center justify-center duration-300 hover:scale-110 cursor-pointer">
                                                    <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-[4px]`}>
                                                        <FileDownIcon className="h-[24px] w-[24px] fill-white"/>
                                                    </div>
                                                </div> */}
                                                <div onClick={()=>{window.open(`/orderPdf?id=${order.id}`)}} className="flex items-center justify-center duration-300 hover:scale-110 cursor-pointer">
                                                    <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-[3px]`}>
                                                        <ClouldSetting  className="h-[25px] w-[25px] fill-white"/>
                                                    </div>
                                                </div>
                                                <div onClick={()=> window.open(`/orderPdf?id=${order.id}&internal=true`)} className="flex items-center justify-center duration-300 hover:scale-110 cursor-pointer">
                                                    <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-[6.5px]`}>
                                                        <Pdf className="h-[20px] w-[20px] fill-white"/>
                                                    </div>
                                                </div>
                                            </>

                                        : null
                                    }
                                    <div onClick={onClose} className="flex items-center justify-center duration-300 hover:scale-110 cursor-pointer">
                                        <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                            <CloseIcon  className="h-[22px] w-[22px] fill-white"/>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </header>
                        {
                            contentLoading ?
                                <main className="w-[36rem] h-[50rem] flex justify-center items-center">
                                    <div className="flex gap-2 animate-ping">
                                        <SpinnerIcon className="h-12 w-12 text-orange-500 fill-white"/>
                                    </div>
                                </main>
                            :
                                <main className="flex flex-col bg-white px-4 py-2 gap-2 overflow-auto ">

                                    <section className="flex flex-col gap-1">

                                        <header  className="flex justify-start items-center gap-2">
                                            <UserPenIcon width={20} height={20} fill={`#94a3b8`}/>
                                            <p onClick={() => console.log('client', client, )} className="text-lg text-slate-500 font-semibold">Cliente</p>
                                        </header>
                                        
                                        <div className="grid gap-2 grid-cols-8">

                                            {/* <div className="col-span-5">
                                                    <label className="block text-sm font-medium text-slate-500">Nome do cliente</label>
                                                    <input type="text" onChange={(x)=> setClient({...client, name: x.target.value})} value={client.name} className={`text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150  ${tryedToSave ? !client.name ? 'ring-2 ring-red-400' : 'ring-2 ring-green-200' : null}`} placeholder="Nome" />
                                            </div>  */}


                                            <div className="col-span-5 relative" onClick={()=> setDropdownNameClient(!dropdownNameClient)}>
                                            
                                                <label className="block text-sm font-medium text-slate-500">Nome do cliente</label>
                                                <div className={`flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150 ${tryedToSave ? !client.name ? 'ring-2 ring-red-400' : 'ring-2 ring-green-200' : null}`}>
                                                    <input onChange={(event)=> setClient({...client, name: event.target.value}) } type="text" className={`bg-gray-50 h-full w-full outline-0 overflow-hidden text-ellipsis whitespace-nowrap cursor-auto`} placeholder="..." value={client.name}/>
                                                    <svg className={`-mr-1 ml-2 h-5 w-6 ${dropdownNameClient ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150 cursor-pointer`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                        <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                    </svg>
                                                </div>

                                                <DropDown.card isOpen={dropdownNameClient} close={()=>setDropdownNameClient(false)}>
                                                    {
                                                        clientArray?.filter(({name})=>{
                                                            if(client.name == "") return name;
                                                                else if(name.toLowerCase().includes(client.name?.toLocaleLowerCase())) return name;
                                                        }).map((clientParam, j)=>{
                                                            return <DropDown.item key={j} onClick={()=>{setDropdownNameClient(!dropdownNameClient); setClient({...clientParam})}} value={clientParam.name}/>
                                                        })
                                                    }
                                                </DropDown.card>

                                            </div>







                                            <div className="col-span-3">
                                                <label className="block text-sm font-medium text-slate-500">Documento</label>
                                                <div className="flex justify-center items-center gap-1">
                                                    <input type="text" maxLength={18} onChange={handleDocument} value={client.document} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="000-000-000-00"/>
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
                                                    <input type="email" onChange={(x)=> setClient({...client, email: x.target.value})} value={client.email} className={`text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 ${tryedToSave ? !client.email ? 'ring-2 ring-red-400' : 'ring-2 ring-green-200' : null}`} placeholder="email@exemplo.com"/>
                                            </div>
                                            <div className="col-span-3">
                                                    <label  className="block text-sm font-medium text-slate-500">Número telefone</label>
                                                    <input maxLength={15} type="text" onChange={handleNumber} value={client.number} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="(00) 0000-0000"/>
                                            </div>

                                        </div>

                                        <div className="grid gap-2 grid-cols-8">

                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-slate-500">Cep</label>
                                                <div className="flex justify-center items-center gap-1">
                                                    <input type="text" onChange={(x)=> setClient({...client, cep: x.target.value})} value={client.cep ? client.cep : ""} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="000-000-000-00"/>
                                                    <div onClick={getCep} className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5 duration-300 hover:scale-110 cursor-pointer`}>
                                                        <IconComponent width={20} height={19} fill={`white`}>
                                                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
                                                        </IconComponent>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-6">
                                                <label className="block text-sm font-medium text-slate-500">Endereço</label>
                                                <input type="text" onChange={(x)=> setClient({...client, info: x.target.value})} value={client.info} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Rua Paraíba, Savassi, Belo Horizonte/MG"/>
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

                                            <div className="relative">
                                                <div onClick={()=> setDropdownEquipament(!dropdownEquipament)}>
                                                    <label className="block text-sm font-medium text-slate-500">Tipo de equipamento</label>
                                                    <button type="button" className="flex justify-between px-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150">
                                                    <label className="block text-sm font-medium text-slate-500 cursor-pointer">{order.name ? order.name : ""}</label>
                                                    
                                                    <svg className={`-mr-1 ml-2 h-5 w-5 ${dropdownEquipament ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                        <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                    </svg>
                                                    </button>
                                                </div>

                                                <DropDown.card isOpen={dropdownEquipament} close={()=>setDropdownEquipament(false)}>
                                                    <DropDown.item onClick={()=>{setDropdownEquipament(!dropdownEquipament); setOrder({...order, name: 'Notebook'})}} value={'Notebook'}/>
                                                    <DropDown.item onClick={()=>{setDropdownEquipament(!dropdownEquipament); setOrder({...order, name: 'Desktop'})}} value={'Desktop'}/>
                                                    <DropDown.item onClick={()=>{setDropdownEquipament(!dropdownEquipament); setOrder({...order, name: 'All in One'})}} value={'All in One'}/>
                                                    <DropDown.item onClick={()=>{setDropdownEquipament(!dropdownEquipament); setOrder({...order, name: 'Outros'})}} value={'Outros'}/>
                                                </DropDown.card>

                                            </div>
                                            
                                            <div >
                                                    <label className="block text-sm font-medium text-slate-500">Número de série</label>
                                                    <input type="text" onChange={(x)=>  setOrder({...order, serialNumber: x.target.value})} value={order.serialNumber} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
                                            </div> 

                                            <div >
                                                    <label className="block text-sm font-medium text-slate-500">Fabricante</label>
                                                    <input type="text" onChange={(x)=>  setOrder({...order, brand: x.target.value})} value={order.brand} className={`text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 ${tryedToSave ? !order.brand ? 'ring-2 ring-red-400' : 'ring-2 ring-green-200' : null}`} placeholder=""/>
                                            </div> 

                                            <div >
                                                    <label className="block text-sm font-medium text-slate-500">Modelo</label>
                                                    <input type="text" onChange={(x)=>  setOrder({...order, model: x.target.value})} value={order.model} className={`text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 ${tryedToSave ? !order.model ? 'ring-2 ring-red-400' : 'ring-2 ring-green-200' : null}`} placeholder=""/>
                                            </div> 
                    
                                        </div>
                                    
                                        <article className="flex flex-col gap-1 select-none">

                                            <header  className="flex justify-start items-center gap-2">
                                                <CheckDouble width={18} height={18} fill={`#94a3b8`}/>
                                                <p className="text-base text-slate-500 font-semibold">Acessórios</p>
                                            </header>
                                            
                                            <div className="flex flex-col gap-2 ">
                    
                                                <article className="flex justify-between gap-2">

                                                    <div onClick={()=> setOrder({...order, charger: !order.charger})} className={`flex items-center ${order.charger ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                        {order.charger ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                                : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                        <label  className={`text-sm ${order.charger ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Carregador</label>
                                                    </div>

                                                    <div onClick={()=> setOrder({...order, battery: !order.battery})} className={`flex items-center ${order.battery ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                        {order.battery ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                                : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                        <label  className={`text-sm ${order.battery ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Bateria</label>
                                                    </div>
                                                    <div onClick={()=> setOrder({...order, energyCable: !order.energyCable})} className={`flex items-center ${order.energyCable ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                        {order.energyCable ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                                : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                        <label  className={`text-sm ${order.energyCable ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Corda de força</label>
                                                    </div>
                                                    <div onClick={()=> setOrder({...order, bag: !order.bag})} className={`flex items-center ${order.bag ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                        {order.bag ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                                : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                        <label  className={`text-sm ${order.bag ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Bolsa</label>
                                                    </div>

                                                </article>
                                            
                                                <div >
                                                    <label className="block text-sm font-medium text-slate-500">Outros</label>
                                                    <input type="text" onChange={(x)=>  setOrder({...order, others: x.target.value})} value={order.others} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
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
                                                    <label className="block text-sm font-medium text-slate-500"></label>
                                                    <div onClick={()=> setOrder({...order, backup: !order.backup})} className={`flex items-center ${order.backup ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                                                        {order.backup ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                                : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                        <label  className={`text-sm ${order.backup ? 'text-orange-500' : 'text-slate-400' } font-semibold cursor-pointer`}>Fazer backup</label>
                                                    </div>
                                                </div>
                                                <div className="col-span-6 flex items-end py-[2.1px]">
                                                    {/* <label className="block text-sm font-medium text-slate-500">&nbsp;</label> */}
                                                    <input type="text" onChange={(x)=>  setOrder({...order, backupDescription: x.target.value})} value={order.backupDescription} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Descrição do backup"/>
                                                </div>

                                                

                                            </article>
                                            <article className="grid grid-cols-2 gap-x-2">

                                                <div className="group">
                                                    <label className="flex justify-between text-sm font-medium text-slate-500">Relatório do cliente <p className="text-xs hidden group-hover:flex" >{ 400 - (order.defectDescription ? order.defectDescription.length : 0)}</p></label>
                                                    <textarea maxLength={399} onChange={(x)=> setOrder({...order, defectDescription: x.target.value})} value={order.defectDescription} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" />
                                                </div>

                                                <div className="group">
                                                    <label className="flex justify-between text-sm font-medium text-slate-500">Laudo técnico <p className="text-xs hidden group-hover:flex" >{ 512 - (order.technicalReport ? order.technicalReport.length : 0)}</p></label>
                                                    <textarea maxLength={511} onChange={(x)=>  setOrder({...order, technicalReport: x.target.value})} value={order.technicalReport} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 group/txt"/>
                                                </div> 

                                                <div className="col-span-2">
                                                    <label className="block text-sm font-medium text-slate-500">Senha do equipamento</label>
                                                    <input type="text" onChange={(x)=>  setOrder({...order, equipamentPassword: x.target.value})} value={order.equipamentPassword ? order.equipamentPassword : ""} className={`text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 ${tryedToSave ? !order.equipamentPassword ? 'ring-2 ring-red-400' : 'ring-2 ring-green-200' : null}`} placeholder=""/>
                                                </div> 

                                                {/* <div className="col-span-1 relative cursor-pointer" onClick={()=> setDropdownShelf(!dropdownShelf)}>
                                                    <label className="block text-sm font-medium text-slate-500">Prateleira</label>
                                                    <div className={`flex justify-between gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150`}>
                                                        <label className="block text-sm font-medium text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">{ shelf ? shelf : "" }
                                                        </label>
                                                        <svg className={`-mr-1 ml-2 h-5 w-6 ${dropdownShelf ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                            <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                        </svg>
                                                    </div>

                                                    <div className={`${!dropdownShelf ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"} absolute bottom-10 z-10 w-full  origin-center rounded-md bg-white shadow-2xl cursor-pointer duration-150`} >
                                                        <div className="py-1">

                                                            <a onClick={()=>{setDropdownShelf(!dropdownShelf); setShelf("recepcao")}}className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-md" >recepção</a>
                                                            <a onClick={()=>{setDropdownShelf(!dropdownShelf); setShelf( "manutencao")}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointe rounded-md" >manutenção</a>

                                                        </div>
                                                    </div>

                                                </div> */}

                                            </article>

                                            <article>
                                                <div className="flex flex-col gap-2">

                                                    <label onClick={()=>console.log('servicos', services)} className="block text-sm font-medium text-slate-500">Serviços</label>

                                                    <div className="grid grid-cols-12 gap-2">

                                                        <div className="col-span-5 relative" onClick={()=> setDropdownNameService(!dropdownNameService)}>

                                                            <div className="flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150">
                                                                <input onChange={(event)=> setNewService({...newService, name: event.target.value}) } type="text" className={`bg-gray-50 h-full w-full outline-0 overflow-hidden text-ellipsis whitespace-nowrap cursor-auto`} placeholder="..." value={newService.name}/>
                                                                <svg className={`-mr-1 ml-2 h-5 w-6 ${dropdownNameService ? "rotate-[-180deg]" : "rotate-[0deg]"} cursor-pointer duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                                    <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                                </svg>
                                                            </div>

                                                            <DropDown.card isOpen={dropdownNameService} close={()=>setDropdownNameService(false)} className="bottom-10">
                                                                {
                                                                    serviceArray?.filter(({name})=>{
                                                                        if(newService.name == "") return name;
                                                                            else if(name.toLowerCase().includes(newService.name?.toLocaleLowerCase())) return name;
                                                                    }).map(({name}, j)=>{
                                                                        return <DropDown.item key={j} onClick={()=>{setDropdownNameService(!dropdownNameService); setNewService({...newService, name: name})}} value={name}/>
                                                                    })
                                                                }
                                                            </DropDown.card>
                                                            
                                                        </div>

                                                        <div className="col-span-4 relative" onClick={()=> setDropdownStatusService(true)}>
                                                            <div className={`flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150`}>
                                                                <input onChange={(event)=>{setNewService({...newService, status: event.target.value})}} type="text" className={`bg-gray-50 h-full w-full outline-0 overflow-hidden text-ellipsis whitespace-nowrap cursor-auto`} placeholder="..." value={newService.status}/>
                                                                <svg className={`-mr-1 ml-2 h-5 w-6 ${dropdownStatusService ? "rotate-[-180deg]" : "rotate-[0deg]"} cursor-pointer duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                                    <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                                </svg>
                                                            </div>

                                                            <DropDown.card isOpen={dropdownStatusService} close={()=>setDropdownStatusService(false)} className="bottom-10">
                                                                <DropDown.item onClick={()=>{setDropdownStatusService(false); setNewService({...newService, status: "aprovado"})}} value={'Aprovado'}/>
                                                                <DropDown.item onClick={()=>{setDropdownStatusService(false); setNewService({...newService, status: "reprovado"})}} value={'Reprovado'}/>
                                                                <DropDown.item onClick={()=>{setDropdownStatusService(false); setNewService({...newService, status: "finalizado"})}} value={'Finalizado'}/>
                                                                <DropDown.item onClick={()=>{setDropdownStatusService(false); setNewService({...newService, status: "arquivado"})}} value={'Arquivado'}/>
                                                            </DropDown.card>

                                                        </div>


                                                        <input type="text" onChange={handleValue} value={newService.value ? newService.value : ''} className="col-span-2 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Valor"/>

                                                        

                                                        <div onClick={()=>addServiceOrder()} className="flex items-center justify-center duration-300 hover:scale-110 cursor-pointer">
                                                            <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                                                <PlusIcon width={20} height={20} fill={`white`}/>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <hr></hr>

                                                    {
                                                        services.length > 0 && services?.map((item, i)=>{
                                                            return (
                                                                <div key={i} className="grid grid-cols-12 gap-2">
                                                                    <input disabled value={item.name} className="col-span-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 opacity-80" />
                                                                    <input disabled value={item.status} className="col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 opacity-80" />
                                                                    <input onChange={(e) => editeServiceOrder({...item, value: String(brMask(e.target.value)) }, i)} value={item.value} className="col-span-2 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 opacity-80" />
                                                                    <div onClick={()=>removeServiceorder(item)} className="flex items-center justify-center  duration-300 hover:scale-110 cursor-pointer">
                                                                        <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-1.5 hover:bg-red-500 hover:opacity-90`}>
                                                                            <CloseIcon className="h-[16px] w-[16px] fill-white"/>
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                            )
                                                        })
                                                    }

                                                    {services.length > 0 ? <hr></hr> : null }

                                                </div>

                                            </article>

                                            <article className="grid grid-cols-12 gap-x-2 py-1">
                                            
                                                <div className="col-span-4 relative">
                                                    <div >
                                                        <label onClick={()=>console.log(order.userId)} className="block text-sm font-medium text-slate-500">Técnico responsável</label>
                                                        <button type="button" onClick={()=> setDropdownOrderInfo(!dropdownOrderInfo)} className={`flex justify-between px-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 ${tryedToSave ? !order.userId ? 'ring-2 ring-red-400' : 'ring-2 ring-green-200' : null}`}>
                                                        <label className="block text-sm font-medium text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                                                            {
                                                                userArray ?
                                                                    userArray.map(({id, name})=>{return order.userId === id ? name : null})
                                                                    : null
                                                            }
                                                        </label>
                                                        
                                                        <svg className={`-mr-1 ml-2 h-5 w-5 ${dropdownOrderInfo ? "rotate-[-180deg]" : "rotate-[0deg]"} cursor-pointer duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                        </svg>
                                                        </button>
                                                    </div>

                                                    <DropDown.card isOpen={dropdownOrderInfo} close={()=>setDropdownOrderInfo(false)} className="bottom-10">
                                                        {
                                                            userArray ? 
                                                                userArray.map(({id, name})=>{
                                                                    return <DropDown.item key={id} onClick={()=>{setDropdownOrderInfo(!dropdownOrderInfo); setOrder({...order, userId: id})}} value={name}/>
                                                                })
                                                                : null
                                                        }
                                                    </DropDown.card>

                                                </div>
                                                
                                                <div className="col-span-3 relative">
                                                    <div className="cursor-pointer" onClick={()=> setDropdownStatus(true)}>
                                                        <label className="block text-sm font-medium text-slate-500 ">Status</label>
                                                        <button type="button" className={`flex justify-between px-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 ${tryedToSave ? !order.status ? 'ring-2 ring-red-400' : 'ring-2 ring-green-200' : null}`}>
                                                            <label className="block text-sm font-medium text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">{order.status ? order.status : ""}</label>
                                                            
                                                            <svg className={`-mr-1 ml-2 h-5 w-5 ${dropdownStatus ? "rotate-[-180deg]" : "rotate-[0deg]"} cursor-pointer duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                                                <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <DropDown.card isOpen={dropdownStatus} close={()=>{setDropdownStatus(false); console.log('test')}} className="bottom-10">
                                                        <DropDown.item onClick={()=>{setDropdownStatus(false); setOrder({...order, status: "aguardando"}); console.log('test')}} value={'aguardando'}/>
                                                        <DropDown.item onClick={()=>{setDropdownStatus(false); setOrder({...order, status: "aprovado"})}} value={'aprovado'}/>
                                                        <DropDown.item onClick={()=>{setDropdownStatus(false); setOrder({...order, status: "reprovado"})}} value={'reprovado'}/>
                                                        <DropDown.item onClick={()=>{setDropdownStatus(false); setOrder({...order, status: "finalizado"})}} value={'finalizado'}/>
                                                        <DropDown.item onClick={()=>{setDropdownStatus(false); setOrder({...order, status: "arquivado"})}} value={'arquivado'}/>
                                                        <DropDown.item onClick={()=>{setDropdownStatus(false); setOrder({...order, status: "orçamento"})}} value={'orçamento'}/>
                                                        <DropDown.item onClick={()=>{setDropdownStatus(false); setOrder({...order, status: "aguardando peça"})}} value={'aguardando peça'}/>
                                                    </DropDown.card>

                                                </div>

                                                <div className="col-span-5 flex items-end py-[2.1px]">
                                                    <div onClick={()=> setOrder({...order, deliveryConfirmation: !order.deliveryConfirmation})} className={`flex items-center ${order.deliveryConfirmation ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-105 duration-150 cursor-pointer `}>
                                                        {order.deliveryConfirmation ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                                                : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                                        <label  className={`text-sm ${order.deliveryConfirmation ? 'text-orange-500' : 'text-slate-400' } font-semibold cursor-pointer`}>Confirmação de entrega</label>
                                                    </div>
                                                </div>

                                                

                                            </article>
                        
                                        </div>

                                    </section>

                                </main>
                        }
                        <footer className="flex flex-col justify-center items-center">
                                { message ? <span className="text-red-600/75  text-center font-bold w-fit">{message}</span> : null}
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

function cpfAndCnpjMask(v: string) {
    v = v.replace(/\D/g, "")
  
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    } else {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2")
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
      v = v.replace(/(\d{4})(\d)/, "$1-$2")
    }
  
    return v
}

function foneMask(v: string) {

    const formattedPhone = v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
    
    return formattedPhone

}

function valueMask(i: any) {
    const match : any = /(\d+)(\.\d+)?/.exec(String(i))
    return match[1].replace(/\d(?=(\d{3})+$)/g, "$&,") + (match[2] ? match[2].replace(".", ",") : ",00");
}

function brMask(i:any) {
let v = i.replace(/\D/g,'');
v = (v/100).toFixed(2) + '';
v = v.replace(".", ",");
i = v;
return i
}

