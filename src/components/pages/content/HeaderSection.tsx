/* components */


/* components */

export interface Props {
    title: string;
    children: React.ReactNode
}


export default function HeaderContent({title, children}:Props) {


    return (
        <>
           <section>
                <article className="flex w-full justify-between py-2">

                    <div onClick={() =>console.log('click')}className="flex justify-center items-center">
                        <p className="text-3xl text-slate-600 font-semibold">{title}</p>
                    </div>

                    {children}

                </article>
            </section>
        </>
    )
}
