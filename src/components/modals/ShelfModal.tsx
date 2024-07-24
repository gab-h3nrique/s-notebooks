
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
import { authUser } from "../../../lib/auth";
import { useAuth } from "../../context/auth";
import { userContext } from "../../context/UserContext";
import ShelfIcon from "../icons/ShelfIcon";
import WrenchIcon from "../icons/WrenchIcon";
import RouteIcon from "../icons/RouteIcon";
import AtendimentoIcon from "../icons/AtendimentoIcon";
import LinkIcon from "../icons/LinkIcon";
import Router from 'next/router';
/* components */

export interface Props {
    
    isOpen: boolean;
    onClose?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void
    onSave?: (data?: any) => void;
    shelf?: Shelf

}

const EMPTY_SHELF = { id: undefined,  type: 'manutencao', userId: undefined}


const ShelfModal = ({isOpen, onClose, onSave, shelf}:Props) => {

    const { user } = userContext()

    const [userArray, setUserArray] = useState<UserType[]>()

    const [editedShelf, setEditedShelf] = useState<Shelf>(EMPTY_SHELF)

    const [dropdown, setDropdown] = useState<any>({})

    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [message, setMessage] = useState('')










    const getUsers = async() => {

        const {response:user} = await Api.get('/api/auth/users')

        setUserArray(user)

    }















    function verifyDeletePermission() {

        if(!user) return false

        if(user.role <= 100) return true

        // if(user.role <= 200 && shelf && shelf.userId == user.id) return true

        false

    }

    function verifySavePermission() {

        if(!user) return false

        if(user.role <= 200) return true

        // if(user.role <= 200 && shelf && shelf.userId == user.id) return true

        false

    }


    async function deleteShelf() {

        try {

            setDeleteLoading(true)

            if(!editedShelf.id) return

            if(!verifyDeletePermission()) return 

            if(editedShelf.order && editedShelf.order.id) return setMessage('Não pode excluir uma prateleria que contém uma OS vinculada')
            
            const { success, message } = await Api.delete('/api/auth/shelf', { id: editedShelf.id})

            // if(!success) return setMessage(message)

            onSave && onSave()

        } catch (error) {

            console.log(error)

            
        } finally {

            setDeleteLoading(false)

        }

    }

    async function saveShelf() {

        try {

            setSaveLoading(true)

            if(!verifySavePermission()) return 

            const { shelf, message } = await Api.post('/api/auth/shelf', editedShelf)

            if(message) return setMessage(message)

            onSave && onSave()
            
        } catch (error: any) {

            console.log(error)

            setMessage(error.message)

            
        } finally {

            setSaveLoading(false)

        }

    }


    useEffect(() => {

        if(isOpen) {
            setEditedShelf(shelf || EMPTY_SHELF)
            setMessage('')
        }
      
    }, [isOpen])

    useEffect(() => {

        getUsers()
      
    }, [])
    


    return (
        <>
            <ModalComponent close={()=> onClose && onClose()} open={isOpen} className={``}>
                <div className="flex flex-col bg-slate-100 w-[20rem] h-fit rounded-2xl overflow-hidden">
                    
                    <header className="p-3">
                        <section className="flex w-full justify-between">
                            <div onClick={()=>console.log(shelf)} className="flex justify-center items-center">
                                <p className="text-2xl text-slate-500 font-semibold">{ shelf?.id ? 'Editar prateleira' : 'Nova prateleira' }</p>
                            </div>
                            <div className="flex justify-center items-center gap-2 relative">

                                <div onClick={onClose} className="flex items-center justify-center duration-300 hover:scale-110 cursor-pointer">
                                    <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                        <CloseIcon  className="h-[22px] w-[22px] fill-white"/>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </header>

                    <main className="h-full flex flex-col bg-white p-4 gap-2">

                        <section className={`flex w-full h-full justify-center items-center ${!loading && 'opacity-0 hidden'}`}>
                            <span className="animate-ping">
                                <SpinnerIcon className="h-12 w-12 animate-ping text-orange-500 fill-white"/>
                            </span>
                        </section>    

                        <section className={`gap-2 flex flex-col w-full h-full ${loading && 'opacity-0 hidden'}`}>

                            <article className="flex items-center h-fit w-fit gap-2">
                                <ShelfIcon className="h-4 w-4 fill-slate-400"/>
                                <p className="text-lg text-slate-500 font-semibold">Número</p>
                            </article>

                            <article className="flex items-center h-fit w-fit gap-2 ">
                                <div className={`text-lg font-bold px-4 rounded-full ${ editedShelf.id && editedShelf.id >= 0 ? 'bg-orange-100 text-orange-500' : 'bg-slate-100 text-slate-500'}`}>
                                    <p className="">{ editedShelf.id && editedShelf.id >= 0 ? editedShelf.id : '- - - -' }</p>
                                </div>
                            </article>

                            <article className="flex items-center h-fit w-fit gap-2">
                                <RouteIcon className="h-4 w-4 fill-slate-400"/>
                                <p className="text-lg text-slate-500 font-semibold">Tipo</p>
                            </article>

                            <article className="flex gap-2 h-fit">

                                <div onClick={()=> setEditedShelf({ ...editedShelf, type: 'manutencao'})} className={`flex items-center ${editedShelf.type == 'manutencao' ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-fit hover:scale-110 duration-100 cursor-pointer `}>
                                    {editedShelf.type == 'manutencao' ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                            : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                    <label  className={`text-sm ${editedShelf.type == 'manutencao' ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Manutenção</label>
                                </div>

                                <div onClick={()=> setEditedShelf({ ...editedShelf, type: 'recepcao'})} className={`flex items-center ${editedShelf.type == 'recepcao' ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-fit hover:scale-110 duration-100 cursor-pointer `}>
                                    {editedShelf.type == 'recepcao' ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                            : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                    <label  className={`text-sm ${editedShelf.type == 'recepcao' ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Recepção</label>
                                </div>

                            </article>

                            <article className="flex items-center h-fit w-fit gap-2">
                                <AtendimentoIcon className="h-4 w-4 fill-slate-400"/>
                                <p className="text-lg text-slate-500 font-semibold">Ordem de serviço</p>
                            </article>

                            <article className="flex items-center h-fit w-fit gap-2 opacity-75 hover:opacity-100 hover:scale-x-105 cursor-pointer duration-150">
                                <div onClick={()=>{ editedShelf?.order && editedShelf?.order.id >= 0 && Router.push(`/app/atendimento?osModal=${editedShelf?.order.id}`)}} className={`flex items-center px-2 py-1 rounded-full bg-slate-100 text-slate-500`}>
                                    <LinkIcon className="h-4 w-4 fill-slate-400"/>
                                    <p className="opacity-70 text-xs font-semibold">-{ editedShelf?.order && editedShelf?.order.id >= 0 ? editedShelf.order.id : '' }-</p>
                                    <p className="opacity-70 text-xs font-semibold">{ editedShelf?.order && editedShelf?.order.status ? editedShelf.order.status : '' }</p>
                                </div>
                            </article>

                            <article className="flex items-center h-fit w-fit gap-2">
                                <WrenchIcon className="h-4 w-4 fill-slate-400"/>
                                <p className="text-lg text-slate-500 font-semibold">Técnico</p>
                            </article>
                            
                            <article className="flex gap-2 h-fit relative">
                                    
                                <div onClick={() => setDropdown({...dropdown, users: true})} className={`flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-fit bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150 `}>
                                    <label className="block text-sm font-medium text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">{ userArray && userArray.find(({id, name})=> id == editedShelf.userId && (name))?.name || 'não atribuido' }</label>
                                    <svg className={`-mr-1 ml-2 h-5 w-6 ${dropdown.users ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150 cursor-pointer`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                        <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                    </svg>
                                </div>

                                <DropDown.card isOpen={dropdown.users} close={()=> setDropdown({...dropdown, users: false})} className="bottom-10 left-2 w-fit">
                                    {
                                        userArray ? 
                                            userArray.filter(({role})=> role <= 200).map(({id, name})=>{
                                                return <DropDown.item key={id} onClick={()=>{ setDropdown({...dropdown, users: false}); setEditedShelf({...editedShelf, userId: id})}} value={name}/>
                                            })
                                        : null
                                    }
                                </DropDown.card>


                            </article>


                        </section>                

                    </main>

                    <footer className="flex flex-col h-fit p-3 justify-center items-center relative">
                        <section className={`pb-2 text-xs font-semibold text-red-400 ${!message && 'hidden'}`}>{message}</section>
                        <section className="flex w-full gap-3">

                            <DropDown.card isOpen={dropdown.delete} close={()=> setDropdown((prev: any)=> ({...prev, delete: false}))} className="bottom-14 left-5 w-fit">
                                <DropDown.item onClick={()=>{ setDropdown((prev: any)=> ({...prev, delete: false})); deleteShelf()}} value={'Confirmar'}/>
                                <DropDown.item onClick={()=> setDropdown((prev: any)=> ({...prev, delete: false}))} value={'Cancelar'}/>
                            </DropDown.card>

                            {
                                shelf && shelf.id && verifyDeletePermission() ?

                                    <div onClick={() => setDropdown((prev: any) => ({...prev, delete: true}))} className={`flex justify-center items-center bg-slate-400 hover:bg-red-500 gap-2 cursor-pointer w-2/4 rounded-xl py-3 px-3 duration-150 hover:scale-y-110 ${!verifyDeletePermission() ? 'hidden' : ''}`}>
                                        {!deleteLoading ? 
                                            <CloseIcon  className="h-[22px] w-[22px] fill-white"/> : 
                                            <SpinnerIcon className="h-5 w-5 text-slate-300 fill-white"/>
                                        } 
                                        <p className={`text-white text-sm font-semibold duration-500`}>
                                            {!deleteLoading ? 'Excluir' : 'Excluindo...'}
                                            
                                        </p>
                                    </div>

                                : null
                            }

                            <div onClick={saveShelf} className={`flex justify-center items-center bg-orange-500 gap-2 cursor-pointer w-full rounded-xl py-3 px-3 duration-150 hover:scale-y-110 ${!verifySavePermission() ? 'hidden' : ''}`}>
                                {!saveLoading ? 
                                    <CheckIcon width={22} height={22} className="fill-white"/> : 
                                    <SpinnerIcon className="h-5 w-5 text-orange-300 fill-white"/>
                                } 
                                <p className={`text-white text-sm font-semibold duration-500`}>
                                    {!saveLoading ? 'Salvar prateleira' : 'Salvando...'}
                                </p>
                            </div>

                        </section>
                    </footer>

                </div>
            </ModalComponent>
        </>
    )
}

export default ShelfModal;
