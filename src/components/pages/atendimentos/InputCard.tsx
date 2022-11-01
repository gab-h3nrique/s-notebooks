/* components */

import ArrowUpIcon from "../../icons/ArrowUpIcon";
import PasteIcon from "../../icons/PasteIcon";
import UserPenIcon from "../../icons/UserPenIcon";
import IconMenu from "../../sidebar/IconMenu";

/* components */

export interface Props {
    title: string;
    value: any;
    children: React.ReactNode
}


export default function InputCard({ title, value, children } :Props) {
    return (
        <>
            <div className="flex flex-col justify-between gap-1 bg-white w-full px-4 py-3 rounded-2xl">
                <section className="flex items-center gap-1">
                    <p className="text-base text-slate-400 font-semibold ">{title}</p>
                </section>
                <section className="flex justify-between items-center gap-1 px-2">

                    <article className="flex ">
                        <input className={`rounded-full`} value={value}></input>
                        
                    </article>

                    <article className="flex justify-center items-center">
                        <div className={`flex w-fit h-fit rounded-lg`}>
                            {children}
                        </div>
                    </article>

                </section>
            </div>
        </>
    )
}