import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '../../../../types/client'
import { Order } from '../../../../types/order'
import { Clients } from '../../../models/clients'
import { Orders } from '../../../models/orders'

export default async function handler( req: NextApiRequest,res: NextApiResponse<Object>) {
    
    const { method } = req

    if(method === 'POST') {

        try {

            const {client, orderInfo, equipament, accessories} =  req.body

            if(!client.email ||  !client.name || !client.document || !client.info) return res.status(500).json( { message: 'informações ausentes do cliente'} )
            if(!orderInfo.userId) return res.status(500).json( { message: 'informações ausentes do equipamento'} )
            
            delete client.cep
            const createdClient = await Clients.createOrUpdateClient(client)

            if(!createdClient) return res.status(500).json( { message: "error saving client"})

            const order:Order = {
                id: orderInfo.id ? orderInfo.id : undefined,
                status: orderInfo.status ? orderInfo.status : 'aberto',
                clientId: createdClient.id,
                userId: orderInfo.userId,
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

            return res.status(201).json( { response: createdOrder } )

        } catch(error) {
            console.log('--------------------------------')
            console.error(error)
            return res.status(500).json({ message: error })
            
        }

    }
    if(method === 'GET') {
        try {

            const { id } = req.query

            let response;

            // if(id) response = await Orders.getOrderById(Number(id))
            if(!id) response = await Orders.getAllOrders()


            return res.status(200).json({response})

        } catch(error) {

            console.error(error)
            return res.status(500).json({ message: error })
            
        }
    }

    // return res.status(405).json({ message: 'method Not allowed' })
}