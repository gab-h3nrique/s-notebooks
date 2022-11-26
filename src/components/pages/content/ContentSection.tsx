/* components */


/* components */

export interface Props {
    className?: string
    children: React.ReactNode
}


export default function ContentSection({className, children}:Props) {


    return (
        <>
            <section className={`w-full h-full px-1 py-1 ${className && className}`}>
                {children}
            </section>
        </>
    )
}
