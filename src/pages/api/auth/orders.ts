import type { NextApiRequest, NextApiResponse } from 'next'
import { Clients } from '../../../models/clients'
import { Orders } from '../../../models/orders'
import { ServicesOrder } from '../../../models/servicesOrder'
import { Shelfs } from '../../../models/shelf'
import { Shelf } from '../../../types/shelf'
import { OrderType } from '../../../types/orderType'
import { ClientType } from '../../../types/clientType'
import { ServiceType } from '../../../types/serviceType'
import email from '../../../../lib/email'
import { emailObject } from '../../../utils/email'

// 200 OK
// 201 Created
// 202 Accepted
// 203 Non-Authoritative Information
// 204 No Content
// 205 Reset Content
// 206 Partial Content

// 400 Bad Request
// 401 Unauthorized
// 402 Payment Required
// 403 Forbidden
// 405 Method Not Allowed
// 406 Not Acceptable
// 429 Too Many Requests
// 500 Internal Server Error
// 501 Not Implemented
// 502 Bad Gateway
// 503 Service Unavailable

export default async function handler( req: NextApiRequest,res: NextApiResponse<Object>) {
    
    const { method } = req

    try{

        if(method === 'POST') {
            
            const { order, client, services, shelfType } =  req.body

            delete order.createdAt;  delete order.updatedAt;

            if(!client.name || !client.email || !order.userId || !order.brand || !order.model || !order.status || !order.equipamentPassword) {

                return res.status(500).json( { message: 'Por favor, verifique os campos obrigatórios!' } )

            }

            //---------------- CLIENT ---------------//
            const createdClient = await Clients.createOrUpdateClient(client)

            if(!createdClient) return res.status(500).json( { message: "error ao salvar o cliente!" })
            //---------------------------------------//


            //---------------- SHELF ----------------//
            let shelfEmpty = <any>{};
            
            // assigns a shelf to the order that does not exist
            if(!order.shelfId) shelfEmpty = await Shelfs.getShelfEmptyByUser(order.userId, shelfType ? shelfType : 'manutencao')
            
            // assigns a shelf to the order that exist
            if(order.shelfId) shelfEmpty.id = order.shelfId
            
            // assigns a shelf to the Order who was changed tec
            const orderDb: any = order.id ? await Orders.getOrderById(order.id) : null

            if(orderDb && order.userId !== orderDb.userId) shelfEmpty = await Shelfs.getShelfEmptyByUser(order.userId, shelfType ? shelfType : 'manutencao')

            // assigns a shelf to the Order who was finished
            const shelfDb: any = order.id && order.shelfId ? await Shelfs.get(order.shelfId) : null;

            if(order.status === 'finalizado' && shelfDb && shelfDb.type === 'recepcao') shelfEmpty = shelfDb
            else if(order.status === 'finalizado') shelfEmpty = await Shelfs.firstEmptyShelf('recepcao')

            if(order.status && order.status === 'arquivado') shelfEmpty = null
            //---------------------------------------//


            //---------------- ORDER ----------------//
            let status = order.status || 'aberto'

            if(order.status != 'finalizado' && order.status != 'arquivado' && services.some((e: any) => e.status == 'sem solução')) status = 'sem solução'
            if(order.status != 'finalizado' && order.status != 'arquivado' && services.some((e: any) => e.status == 'reprovado')) status = 'reprovado'
            if(order.status != 'finalizado' && order.status != 'arquivado' && services.some((e: any) => e.status == 'reparado')) status = 'reparado'
            if(order.status != 'finalizado' && order.status != 'arquivado' && services.some((e: any) => e.status == 'aguardando')) status = 'aguardando'
            if(order.status != 'finalizado' && order.status != 'arquivado' && services.some((e: any) => e.status == 'aguardando peça')) status = 'aguardando peça'
            if(order.status != 'finalizado' && order.status != 'arquivado' && services.some((e: any) => e.status == 'aprovado')) status = 'aprovado'

            const allOrder = { ...order, shelfId: (shelfEmpty?.id ? shelfEmpty.id : null), clientId: createdClient.id, status: status }
            
            const createdOrder = await Orders.createOrUpdateOrder(allOrder)

            if(!createdOrder) return res.status(500).json( { message: "error ao salvar ordem de serviço!"})

            // if(!allOrder.id && createdOrder.id) await ServicesOrder.createManyByOrderId(services, createdOrder.id)
            if(createdOrder.id) await ServicesOrder.createOrUpdateMany(services, createdOrder.id)
            //---------------------------------------//


            //---------------- EMAIL ----------------//
            if(order.status == 'finalizado') email.send(emailObject(createdOrder, client, services))
            else if(!order.id) email.send(emailObject(createdOrder, client, services))
            //---------------------------------------//



            return res.status(201).json( { response: createdOrder } )
        }

        if(method === 'GET') {
        
            const { id, status, userId, startDate, endDate} = req.query

            const page = Number(req.query.page)
            const limit = Number(req.query.limit)

            let orders;

            if(id) return res.status(200).json({ response: await Orders.getOrderById(Number(id)) });

            if(!id && (!page || !limit)) return res.status(200).json({response: await Orders.getAllOrders() })

            const startIndex = (page - 1) * limit
            
            const response = {
                currentPage: page,
                total: await Orders.getTotalOrders(),
                totalPages: Math.ceil(await Orders.getTotalOrders(undefined, undefined, status, userId, startDate, endDate) / limit),
                results: await Orders.getPageOrders(startIndex, limit, status, userId, startDate, endDate)
            }
            
            return res.status(200).json({response: response})
            
        }

        if(method === 'DELETE') {
        
            const { id } = req.query

            if(!id) return res.status(500).json({ message: 'is missing id' })

            const deletedOrder = await Orders.deletetOrderById(Number(id))

            return res.status(200).json({response: deletedOrder})
            
        }

        return res.status(405).json({ message: 'method Not allowed' })

    } catch(error:any) {

        console.error(error)
        return res.status(500).json({ message: error.message })
        
    }

}