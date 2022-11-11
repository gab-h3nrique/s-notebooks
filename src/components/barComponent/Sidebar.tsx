import { NextPage } from "next"
import { useState } from "react"
import Snotebooks from "../../components/icons/Snotebooks"
import AtendimentoIcon from "../icons/AtendimentoIcon"
import CloudPlus from "../icons/CloudPlus"
import DashboardIcon from "../icons/DashboardIcon"
import IconMenu from "./IconMenu"
import Menus from "./Menus"

interface Props {
    menu: string
}

const Sidebar = (props:Props) => {
    const { menu } = props
    const [open, setOpen] = useState<boolean>(true)
    return (
        <aside className={`flex flex-col gap-5 duration-500 ${open ? 'w-52' : 'w-24'} px-3 py-8 bg-white rounded-2xl`}>
            <div className="mb-10 hover:scale-110 duration-500">
                <div onClick={() => setOpen(!open)} className={`flex justify-start  gap-2 items-center cursor-pointer h-16 rounded-2xl px-3 duration-500`}>

                <div className={`flex duration-500 ${open && "rotate-[360deg]"} duration-500 border-2 bg-orange-500 border-white w-fit h-fit rounded-lg p-2 `}>
                    <div className={`cursor-pointer duration-500 ${open && "rotate-[-360deg]"} duration-500`}>
                        <Snotebooks width={28} height={28} fill={'white'}/>
                    </div>
                </div>
                <h1 className={`text-orange-500 text-xl font-bold duration-500 ${!open ? "scale-0 opacity-0 duration-300" : "scale-100 delay-100"}`}>Facebook</h1>
                </div>
            </div>

            <div className="flex flex-col gap-4 ">
                <Menus className={`${menu === "dashboard" && 'bg-orange-500' }`}>
                    <IconMenu>
                        <DashboardIcon width={30} height={30} fill={`${menu === "dashboard" ? "white" : "#94a3b8"}`}/>
                    </IconMenu>
                    <h1 className={`${menu === "dashboard" ? "text-white" : "text-slate-400" }  text-sm font-semibold duration-500 ${!open ? "scale-0 opacity-0 duration-300" : "scale-100 delay-100"}`}>
                        Dashboard
                    </h1>
                </Menus>
               <Menus className={`${menu === "atendimento" && 'bg-orange-500' }`}>
                    <IconMenu>
                        <AtendimentoIcon width={32} height={32} fill={`${menu === "atendimento" ? "white" : "#94a3b8"}`}/>
                    </IconMenu>
                    <h1 className={`${menu === "atendimento" ? "text-white" : "text-slate-400" }  text-sm font-semibold duration-500 ${!open ? "scale-0 opacity-0 duration-300" : "scale-100 delay-100"}`}>
                        Atendimento
                    </h1>
                </Menus>
               <Menus className={`${menu === "servicos" && 'bg-orange-500' }`}>
                    <IconMenu>
                        <CloudPlus width={30} height={30} fill={`${menu === "servicos" ? "white" : "#94a3b8"}`}/>
                    </IconMenu>
                    <h1 className={`${menu === "servicos" ? "text-white" : "text-slate-400" }  text-sm font-semibold duration-500 ${!open ? "scale-0 opacity-0 duration-300" : "scale-100 delay-100"}`}>
                        Serviços
                    </h1>
                </Menus>
            </div>

        </aside>
       
    )
}

export default Sidebar