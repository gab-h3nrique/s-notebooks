import React, { useEffect, useState } from 'react'
import { Shelf } from '../../../types/shelf'
import ShelfIcon from '../../icons/ShelfIcon'
import WrenchIcon from '../../icons/WrenchIcon'
import AtendimentoIcon from '../../icons/AtendimentoIcon'
import InfoCard from '../atendimentos/StatusInfo'
import Svg from '../../icons/Svg'
import Dialog from '../../modals/Dialog'
import CloseIcon from '../../icons/CloseIcon'
import DropDown from '../../elements/DropDown'
import Api from '../../../../lib/api'
import { UserType } from '../../../types/userType'
import CheckIcon from '../../icons/CheckIcon'
import SpinnerIcon from '../../icons/SpinnerIcon'
import CircleCheckIcon from '../../icons/CircleCheckIcon'
import CircleIcon from '../../icons/CircleIcon'
import RouteIcon from '../../icons/RouteIcon'
import { userContext } from '../../../context/UserContext'

interface Props {
    onUpdate: ()=> any
}


const EMPITY_RANGE = { type: 'manutencao', userId: -1, start: '', end: '' }

function ShelfRange({ onUpdate }:Props) {

    const { user } = userContext()

    const [modal, setModal] = useState(false)

    const [dropdown, setDropdown] = useState<any>()

    const [saveLoad, setSaveLoad] = useState(false)

    const [load, setLoad] = useState(false)

    const [message, setMessage] = useState('')

    const [userArray, setUserArray] = useState<UserType[]>()

    const [range, setRange] = useState(EMPITY_RANGE)


    function verifyPermission() {

        if(!user) return false

        if(user.role <= 100) return true

        false

    }






    const getUsers = async() => {

        const {response:user} = await Api.get('/api/auth/users')

        setUserArray(user)

    }






    function openModal() {

        if(!verifyPermission()) return 

        setRange(EMPITY_RANGE)
        setModal(true)

    }


    async function save() {

        try {

            setSaveLoad(true)

            const { success, message } = await Api.post('/api/auth/rangeShelf', range)

            if(message) return setMessage(message)

            setModal(false)
            onUpdate()

        } catch (error: any) {

            console.log(error)

            setMessage(error.message)
            
        } finally {

            setSaveLoad(false)

        }

    }


    useEffect(() => {

        getUsers()
      
    }, [])

    return (

        <>
            <article onClick={openModal} className={`cols-span-2 p-3 gap-3 rounded-lg flex flex-col bg-white w-full h-full cursor-pointer hover:scale-105 duration-150`}>
                <section className="flex justify-start items-center gap-2 ">
                    <Svg.ArrowLeftRight className='h-5 w-5 fill-slate-400'/>
                    <p className="text-[1.2rem] text-slate-400 font-semibold">Range</p>
                </section>
                <section className={`py-1 px-2 rounded-md flex justify-start items-start gap-1 bg-slate-100 w-fit h-fit`}>
                    <Svg.LightBulb className="h-4 w-4 mt-[.2rem] fill-slate-400 group-hover:fill-orange-500 duration-150"/>
                    <p className="text-[.8rem] text-slate-400 font-semibold">
                        Crie ou edite as prateleiras pelo range definido
                    </p>
                </section>
            </article>

            <Dialog isOpen={modal} close={()=> setModal(false)}>

                <div className="flex flex-col bg-slate-100 w-[20rem] h-fit rounded-2xl overflow-hidden">
                    
                    <header className="p-3">
                        <section className="flex w-full justify-between">
                            <div className="flex justify-center items-center">
                                <p className="text-2xl text-slate-500 font-semibold">Configurar range</p>
                            </div>
                            <div className="flex justify-center items-center gap-2 relative">

                                <div onClick={()=> setModal(false)} className="flex items-center justify-center duration-300 hover:scale-110 cursor-pointer">
                                    <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                                        <CloseIcon  className="h-[22px] w-[22px] fill-white"/>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </header>

                    <main className="h-full flex flex-col bg-white p-4">

                        <section className={`flex w-full h-full justify-center items-center ${!load && 'opacity-0 hidden'}`}>
                            <span className="animate-ping">
                                <SpinnerIcon className="h-12 w-12 animate-ping text-orange-500 fill-white"/>
                            </span>
                        </section>    

                        <section className={`gap-4 flex flex-col w-full h-full ${load && 'opacity-0 hidden'}`}>

                            <article className="flex items-center h-fit w-fit gap-2">
                                <ShelfIcon className="h-4 w-4 fill-slate-400"/>
                                <p className="text-lg text-slate-500 font-semibold">Range</p>
                            </article>

                            <article className="flex items-center h-fit w-fit gap-2 ">
                                <input onChange={e => setRange({...range, start: e.target.value})} value={range.start} type='number' className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 opacity-80" />
                                <input onChange={e => setRange({...range, end: e.target.value})} value={range.end} type='number' className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150 opacity-80" />
                            </article>

                            <article className="flex items-center h-fit w-fit gap-2">
                                <RouteIcon className="h-4 w-4 fill-slate-400"/>
                                <p className="text-lg text-slate-500 font-semibold">Tipo</p>
                            </article>

                            <article className="flex gap-2 h-fit">

                                <div onClick={()=> setRange({ ...range, type: 'manutencao'})} className={`flex items-center ${range.type == 'manutencao' ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-fit hover:scale-110 duration-100 cursor-pointer `}>
                                    {range.type == 'manutencao' ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                            : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                    <label  className={`text-sm ${range.type == 'manutencao' ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Manutenção</label>
                                </div>

                                <div onClick={()=> setRange({ ...range, type: 'recepcao'})} className={`flex items-center ${range.type == 'recepcao' ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-fit hover:scale-110 duration-100 cursor-pointer `}>
                                    {range.type == 'recepcao' ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                                            : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                                    <label  className={`text-sm ${range.type == 'recepcao' ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Recepção</label>
                                </div>

                            </article>

                            <article className="flex items-center h-fit w-fit gap-2">
                                <WrenchIcon className="h-4 w-4 fill-slate-400"/>
                                <p className="text-lg text-slate-500 font-semibold">Técnico</p>
                            </article>
                            
                            <article className="flex gap-2 h-fit relative">
                                    
                                <div onClick={() => setDropdown({...dropdown, users: true})} className={`flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-fit bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150 `}>
                                    <label className="block text-sm font-medium text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">{ userArray && userArray.find(({id, name})=> id == range.userId && (name))?.name || 'não atribuido' }</label>
                                    <svg className={`-mr-1 ml-2 h-5 w-6 ${dropdown?.users ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150 cursor-pointer`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                        <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                    </svg>
                                </div>

                                <DropDown.card isOpen={dropdown?.users} close={()=> setDropdown({...dropdown, users: false})} className="bottom-10 left-2 w-fit">
                                    {
                                        userArray ? 
                                            userArray.filter(({role})=> role <= 200).map(({id, name})=>{
                                                return <DropDown.item key={id} onClick={()=>{ setDropdown({...dropdown, users: false}); setRange((prev) => ({...prev, userId: id}))}} value={name}/>
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

                            <div onClick={save} className={`flex justify-center items-center bg-orange-500 gap-2 cursor-pointer w-full rounded-xl py-3 px-3 duration-150 hover:scale-y-110`}>
                                {!saveLoad ? 
                                    <CheckIcon width={22} height={22} className="fill-white"/> : 
                                    <SpinnerIcon className="h-5 w-5 text-orange-300 fill-white"/>
                                } 
                                <p className={`text-white text-sm font-semibold duration-500`}>
                                    {!saveLoad ? 'Salvar range' : 'Salvando...'}
                                </p>
                            </div>

                        </section>
                    </footer>

                </div>

            </Dialog>
        </>

    )
}

export default ShelfRange


