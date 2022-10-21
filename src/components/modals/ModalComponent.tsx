
/* components */

/* components */

export interface Props {
    close: any;
    className: string;
    children: React.ReactNode;
}

const ModalComponent = ({close, className, children}:Props) => {
    return (
        <>
            <div onClick={close} className="fixed bg-slate-900 opacity-40 top-0 left-0 right-0 bottom-0 z-40"></div>
            <div className={`fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] p-4 bg-slate-200 ${className} z-50`}>
                {children}
            </div>
        </>
    )
}
export default ModalComponent;