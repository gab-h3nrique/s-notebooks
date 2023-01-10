import type { NextApiRequest, NextApiResponse } from 'next'
import { Clients } from '../../../models/clients'
import { Orders } from '../../../models/orders'
import { ServicesOrder } from '../../../models/servicesOrder'
import { Shelfs } from '../../../models/shelf'
import { OrderType } from '../../../types/orderType'
import { ClientType } from '../../../types/clientType'
import { ServiceType } from '../../../types/serviceType'

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

            const {order, client, services} =  req.body

            delete client.cep; delete order.createdAt;  delete order.updatedAt;

            if(!client.name || !client.email || !order.userId || !order.brand || !order.model || !order.status) return res.status(500).json( { message: 'Por favor, verifique os campos obrigatórios!'} )

            const createdClient = await Clients.createOrUpdateClient(client)

            if(!createdClient) return res.status(500).json( { message: "error ao salvar o cliente!"})

            const shelfEmpty = await Shelfs.getFirstShelfEmpty(order.userId)

            const allOrder = { ...order, shelfId: shelfEmpty?.id, clientId: createdClient.id }

            const createdOrder = await Orders.createOrUpdateOrder(allOrder)

            if(!createdOrder) return res.status(500).json( { message: "error ao salvar ordem de serviço!"})

            if(!allOrder.id && createdOrder.id) await ServicesOrder.createManyByOrderId(services, createdOrder.id)

            return res.status(201).json( { response: createdOrder } )
        }

        if(method === 'GET') {
        
            const { id, status, userId, startDate, endDate} = req.query

            const page = Number(req.query.page)
            const limit = Number(req.query.limit)
            console.log({status, userId, startDate, endDate})

            let orders;

            if(id) orders = await Orders.getOrderById(Number(id))
            if(!id) orders = await Orders.getAllOrders()
            
            if(!page || !limit)  return res.status(200).json({response: orders})

            const startIndex = (page - 1) * limit
            
            const response = {
                currentPage: page,
                total: await Orders.getTotalOrders(),
                totalPages: Math.ceil(await Orders.getTotalOrders() / limit),
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

    } catch(error) {

        console.error(error)
        return res.status(500).json({ message: error })
        
    }

}