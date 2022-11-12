import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '../../../../../types/client'
import { Order } from '../../../../../types/order'
import { Clients } from '../../../../models/clients'
import { Orders } from '../../../../models/orders'

interface SearchQuery {
    content?:string;
}
export default async function handler( req: NextApiRequest,res: NextApiResponse<Object>) {
    
    const { method } = req

    try{

        if(method === 'GET') {
        
            const { content }: SearchQuery = req.query

            const foundClient = await Clients.searchFirstClient(content? content : '')

            let foundOrders;

            if(foundClient) foundOrders = await Orders.searchByClient(foundClient.id)

            if(!foundClient) foundOrders = await Orders.searchOrders(content? content : '')

            return res.status(200).json({response: foundOrders})
            
        }

        return res.status(405).json({ message: 'method Not allowed' })

    } catch(error) {

        console.error(error)
        return res.status(500).json({ message: error })
        
    }

}