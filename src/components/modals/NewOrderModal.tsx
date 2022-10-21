
/* components */

import { Key, ReactElement, ReactNode, useEffect, useState } from "react";
import ReactDom from "react-dom";
import ModalComponent from "./ModalComponent";

/* components */

export interface Props {
    isOpen: boolean;
    onClose: any;
    formOder: FormOrder
}
export interface FormOrder {
    name: string
}

const NewOrderModal = ({isOpen, onClose, formOder}:Props) => {

    if(!isOpen) return null

    return ReactDom.createPortal(
        <>
            <ModalComponent close={onClose} className={`opacity-100 duration-100`}>
                <div className="bg-white w-44 h-64" onClick={onClose}>close modalsdaf</div>
            </ModalComponent>
        </>,
        document.getElementById('portal') as HTMLElement
    )
}
export default NewOrderModal;