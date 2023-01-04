import type { NextApiRequest, NextApiResponse } from 'next'
import { Clients } from '../../../../models/clients'
import { Orders } from '../../../../models/orders'

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

            // if(!foundClient) foundOrders = await Orders.searchOrders(content? content : '')

            return res.status(200).json({response: foundOrders})
            
        }

        return res.status(405).json({ message: 'method Not allowed' })

    } catch(error) {

        console.error(error)
        return res.status(500).json({ message: error })
        
    }

}