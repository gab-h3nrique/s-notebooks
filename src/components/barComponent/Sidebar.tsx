import { NextPage } from "next"

import { useEffect, useState } from "react"
import Api from "../../../lib/api"
import { deleteCookie } from "../../../lib/cookie"
import Snotebooks from "../../components/icons/Snotebooks"
import AngleUpIcon from "../icons/AngleUpIcon"
import AtendimentoIcon from "../icons/AtendimentoIcon"
import CloudPlus from "../icons/CloudPlus"
import DashboardIcon from "../icons/DashboardIcon"
import SignOutIcon from "../icons/SignOutIcon"
import IconMenu from "./IconMenu"
import Menus from "./Menus"

import Router from 'next/router';
import GearIcon from "../icons/GearIcon"

interface Props {
    menu: string
}

const Sidebar = (props:Props) => {
    const { menu } = props
    const [open, setOpen] = useState<boolean>(false)

    function handleSidebar(param:boolean) {
        setSidebarStorage(param)
        setOpen(getSidebarStorage())
    }
    
    function setSidebarStorage(param:boolean) {
        localStorage.setItem('sidebar', JSON.stringify(param));
    }
    function getSidebarStorage():boolean {
        return JSON.parse(localStorage.getItem('sidebar') as string)
    }

    useEffect(()=>{
        if (typeof window !== "undefined") handleSidebar(getSidebarStorage())
    },[])

    return (
        <aside className={`relative flex flex-col gap-12 duration-700  ${open ? 'w-[15rem]' :'w-[6.1rem]'} px-3 py-8 bg-white rounded-2xl`}>


            <div className={`absolute w-fit h-fit duration-700 ${!open ? 'rotate-0' :'rotate-180'} -right-3 top-[46px] bg-orange-500 border-[6px] border-solid border-white rounded-full p-[.18rem]`}>
                <AngleUpIcon transform={'rotate(90)'} width={20} height={20} fill={`white`}/>
            </div>        

            <section className="hover:scale-110 duration-300 ">
                <div onClick={() => handleSidebar(!getSidebarStorage())} className={`flex ${open ? ' justify-start' :' delay-500'} w-full gap-[.3rem] items-center cursor-pointer h-16 rounded-2xl px-3 duration-700`}>

                    <div className={ `flex duration-300 delay-200 ${open && "rotate-[360deg]"} border-2 bg-orange-500 border-white w-fit h-fit rounded-lg p-2`}>
                        <div className={`cursor-pointer duration-300 ${open && "rotate-[-360deg]"} w-full delay-200`}>
                            <Snotebooks width={28} height={28} fill={'white'}/>
                        </div>
                    </div>

                    <div className="">
                        <h1 className={`text-orange-500 text-[1.2rem] font-bold w-0 ${!open ? "w-0 opacity-0 duration-300" : "w-full opacity-1 duration-700 delay-500"}`}>Notebooks</h1>
                    </div>

                </div>
            </section>


            <section className="flex flex-col gap-4 ">
                <Menus onClick={()=>{Router.push('/app/dashboard')}} className={`${menu === "dashboard" && 'bg-orange-500' }`}>
                    <IconMenu>
                        <DashboardIcon width={30} height={30} fill={`${menu === "dashboard" ? "white" : "#94a3b8"}`}/>
                    </IconMenu>
                    <h1 className={`${menu === "dashboard" ? "text-white" : "text-slate-400" }  text-sm font-semibold duration-500 w-0 ${!open ? "w-0 opacity-0 duration-300" : "w-full opacity-1 duration-700 delay-500"}`}>
                        Dashboard
                    </h1>
                </Menus>
               <Menus onClick={()=>{Router.push('/app/atendimento')}} className={`${menu === "atendimento" && 'bg-orange-500' }`}>
                    <IconMenu>
                        <AtendimentoIcon width={32} height={32} fill={`${menu === "atendimento" ? "white" : "#94a3b8"}`}/>
                    </IconMenu>
                    <h1 className={`${menu === "atendimento" ? "text-white" : "text-slate-400" }  text-sm font-semibold duration-500 w-0 ${!open ? "w-0 opacity-0 duration-300" : "w-full opacity-1 duration-700 delay-500"}`}>
                        Atendimento
                    </h1>
                </Menus>
               {/* <Menus onClick={()=>{Router.push('/app/ordemServico')}} className={`${menu === "ordemServico" && 'bg-orange-500' }`}>
                    <IconMenu>
                        <CloudPlus width={30} height={30} fill={`${menu === "ordemServico" ? "white" : "#94a3b8"}`}/>
                    </IconMenu>
                    <h1 className={`${menu === "ordemServico" ? "text-white" : "text-slate-400" }  text-sm font-semibold duration-500 w-0 ${!open ? "w-0 opacity-0 duration-300" : "w-full opacity-1 duration-700 delay-500"}`}>
                        Os
                    </h1>
                </Menus> */}
               <Menus  onClick={()=>{Router.push('/app/configuracao')}} className={`${menu === "configuracao" && 'bg-orange-500' }`}>
                    <IconMenu>
                        <GearIcon className={`h-8 w-8 text-orange-300 ${menu === "configuracao" ? "fill-white" : "fill-slate-400"}`} fill={`${menu === "configuracao" ? "white" : "#94a3b8"}`}/>
                    </IconMenu>
                    <h1 className={`${menu === "configuracao" ? "text-white" : "text-slate-400" }  text-sm font-semibold duration-500 w-0 ${!open ? "w-0 opacity-0 duration-300" : "w-full opacity-1 duration-700 delay-500"}`}>
                        Configuração
                    </h1>
                </Menus>
            </section>

            <section className="px-2 mt-auto">
                
                <div onClick={()=> Api.signOut()} className="flex items-center justify-start gap-3 hover:scale-110 duration-300 cursor-pointer hover:bg-slate-100 rounded-2xl p-3">

                    <div className="">
                        <SignOutIcon className={`w-8 h-8 fill-slate-400`} />
                    </div>
                    <div className="">

                    <h1 className={`text-slate-400 text-sm font-semibold duration-500 w-0 ${!open ? "w-0 opacity-0 duration-300" : "w-full opacity-1 duration-700 delay-500"}`}>
                        Sair
                    </h1>
                    </div>

                </div>

            </section>

        </aside>
       
    )
}

export default Sidebar