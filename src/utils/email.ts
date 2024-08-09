import { ClientType } from "../types/clientType";
import { OrderType } from "../types/orderType";
import { ServiceOrderType, ServiceType } from "../types/serviceType";


export function emailObject(order: OrderType, client: ClientType, services: ServiceOrderType[] | undefined): any {

    const body = (`
        <p>Olá ${client.name} o status do seu atendimento é <b>${order.status}</b></p>
        <p>Serviços:</p>
        <ul>
            ${
                services?.map(e=> (`
                    <li>
                        ${e.name}  ${e.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })} <b>${e.status}</b>
                    </li>
                `)) 
            }
        </ul>
        <p>Total: <b>${services?.reduce((prev, item) => prev + Number(item.value), 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</b></p>
        <br>
        <span>Obrigado por confiar em nossos serviços.</span>
        <span>Savassi Notebooks</span>
    `)

    return {
        to: client.email,
        subject:  `Atendimento Nº${order.id}`,
        html: body
    }

}