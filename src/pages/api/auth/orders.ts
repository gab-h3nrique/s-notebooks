import type { NextApiRequest, NextApiResponse } from 'next'
import { Clients } from '../../../models/clients'
import { Orders } from '../../../models/orders'
import { ServicesOrder } from '../../../models/servicesOrder'
import { Shelfs } from '../../../models/shelf'
import { OrderType } from '../../../types/orderType'

export default async function handler( req: NextApiRequest,res: NextApiResponse<Object>) {
    
    const { method } = req

    try{

        if(method === 'POST') {

            const {client, orderInfo, equipament, accessories, services} =  req.body

            if(!client.email ||  !client.name || !client.document || !client.info) return res.status(500).json( { message: 'informações ausentes do cliente'} )
            if(!orderInfo.userId) return res.status(500).json( { message: 'informações ausentes do equipamento'} )
            
            delete client.cep
            const createdClient = await Clients.createOrUpdateClient(client)

            if(!createdClient) return res.status(500).json( { message: "error saving client"})

            const shelfEmpty = await Shelfs.getFirstShelfEmpty(orderInfo.userId)
            

            const order:OrderType = {
                id: orderInfo.id ? orderInfo.id : undefined,
                status: orderInfo.status ? orderInfo.status : 'aberto',
                clientId: createdClient.id,
                userId: orderInfo.userId,
                shelfId: shelfEmpty?  shelfEmpty.id : undefined,
                model: equipament.model,
                brand: equipament.brand,
                name: equipament.name,
                serialNumber: equipament.serialNumber,
                charger: accessories.charger,
                battery: accessories.battery,
                energyCable: accessories.energyCable,
                bag: accessories.bag,
                others: accessories.others,
                warranty: false,
                warrantyDescription: "",
                backup: orderInfo.backup,
                backupDescription: orderInfo.backupDescription,
                defectDescription: orderInfo.defectDescription,
                technicalReport: orderInfo.technicalReport,
                generalDescription: orderInfo.generalDescription,
                deliveryConfirmation: orderInfo.deliveryConfirmation,
                value: 0,
            }

            const createdOrder = await Orders.createOrUpdateOrder(order)

            await ServicesOrder.createOrUpdate(services, Number(createdOrder.id))

            return res.status(201).json( { response: createdOrder } )

        }

        if(method === 'GET') {
        
            const { id } = req.query

            const page = Number(req.query.page)
            const limit = Number(req.query.limit)

            let orders;
            console.log('id', id)
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

        return res.status(405).json({ message: 'method Not allowed' })

    } catch(error) {

        console.error(error)
        return res.status(500).json({ message: error })
        
    }

}