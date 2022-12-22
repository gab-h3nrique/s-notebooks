import type { NextApiRequest, NextApiResponse } from 'next'
import { Services } from '../../../models/services'
import { Users } from '../../../models/users'

export default async function handler( req: NextApiRequest,res: NextApiResponse<Object>) {
    
    const { method } = req

    if(method === 'GET') {

        try {

            const { name } = req.query

            let services;

            // if(name) orders = await Orders.getServiceByName(name)
            if(!name) services = await Services.getAllServices()

            return res.status(201).json({ response: services })

        } catch(error) {

            console.error(error)
            return res.status(500).json({ message: error })
            
        }

    }

    return res.status(405).json({ message: 'method Not allowed' })
}