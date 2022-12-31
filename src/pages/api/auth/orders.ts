import type { NextApiRequest, NextApiResponse } from 'next'
import { Clients } from '../../../models/clients'
import { Orders } from '../../../models/orders'
import { ServicesOrder } from '../../../models/servicesOrder'
import { Shelfs } from '../../../models/shelf'
import { OrderType } from '../../../types/orderType'
import { ClientType } from '../../../types/clientType'
import { ServiceType } from '../../../types/serviceType'

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

            await ServicesOrder.createOrUpdate(services, Number(createdOrder.id))

            return res.status(201).json( { response: createdOrder } )
        }

        if(method === 'GET') {
        
            const { id } = req.query

            const page = Number(req.query.page)
            const limit = Number(req.query.limit)

            let orders;

            if(id) orders = await Orders.getOrderById(Number(id))
            if(!id) orders = await Orders.getAllOrders()
            
            if(!page || !limit)  return res.status(200).json({response: orders})

            const startIndex = (page - 1) * limit
            
            const response = {
                currentPage: page,
                total: await Orders.getTotalOrders(),
                totalPages: Math.ceil(await Orders.getTotalOrders() / limit),
                results: await Orders.getPageOrders(startIndex, limit)
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