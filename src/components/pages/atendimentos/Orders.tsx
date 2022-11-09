/* components */

import ArrowUpIcon from "../../icons/ArrowUpIcon";
import ChipsetIcon from "../../icons/ChipsetIcon";
import ClipboardCheck from "../../icons/ClipboardCheck";
import DescktopIcon from "../../icons/DescktopIcon";
import IconComponent from "../../icons/IconComponent";
import LaptopIcon from "../../icons/LaptopIcon";
import TagIcon from "../../icons/TagIcon";
import UserIcon from "../../icons/UserIcon";
import IconMenu from "../../sidebar/IconMenu";
import StatusInfo from "./StatusInfo";

/* components */

export interface Props {
    onClick: any;
    osNumber: number;
    clientName: string;
    clientDocument: string
    deviceName: string;
    osStatus: string;
}


export default function OrderList(props :Props) {
    const { osNumber, clientName, clientDocument, deviceName, osStatus, onClick } = props;
return (
    <>
        <div onClick={onClick} className="flex items-center justify-between gap-6 bg-white w-full h-fit p-2 rounded-2xl cursor-pointer  opacity-75 hover:opacity-100 hover:scale-x-95 duration-300">
            
             <section className="flex  rounded-lg justify-center p-1 items-center gap-2">
                <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                    <TagIcon width={22} height={22} fill={`white`}/>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-xl text-orange-500 font-bold">{osNumber}</p>
                </div>
            </section>

            <section className="flex w-full gap-4 ">
               

                <section className="flex w-1/3 justify-start items-center gap-2">
                    <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-1.5`}>
                        <DescktopIcon width={18} height={18} fill={`white`}/>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-lg text-slate-600 font-semibold">{deviceName}</p>
                    </div>
                </section>

                <section className="flex w-1/3 justify-start items-center gap-2">
                    <div className={`flex bg-slate-400 w-fit h-fit rounded-lg p-1.5`}>
                        <UserIcon width={18} height={18} fill={`white`}/>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <p className="text-lg text-slate-600 font-semibold">{clientName}</p>
                        <p className="text-xs text-slate-500 font-semibold">cpf: {clientDocument}</p>
                    </div>
                </section>

                <section className="flex  w-1/3 justify-center items-center gap-2">

                    <div className="flex justify-center items-center">
                        <p className="text-sm text-slate-600 font-semibold">há 5 horas</p>
                    </div>
                </section>

            </section>

            <section className="flex justify-center items-center gap-1">
                <StatusInfo textColor="text-green-700" backgroundColor="bg-green-100" status={osStatus} />
            </section>

            

        </div>
    </>
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
)
}