import { NextPage } from "next"
import { useState } from "react"
import Snotebooks from "../../components/icons/Snotebooks"
import AtendimentoIcon from "../icons/AtendimentoIcon"
import CloudPlus from "../icons/CloudPlus"
import DashboardIcon from "../icons/DashboardIcon"
import IconMenu from "./IconMenu"
import Menus from "./Menus"

// interface Props {
//     menu: string
// }

const Asidebar = () => {
    return (
        <aside className={`flex flex-col w-fit h-full px-3 py-8 bg-white rounded-2xl`}>
           <div className="flex w-80 h-10 bg-orange-500  rounded-2xl"></div>
        </aside>
    )
}

export default Asidebar