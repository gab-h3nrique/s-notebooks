import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '../../../models/users'

export default async function handler( req: NextApiRequest,res: NextApiResponse<Object>) {
    
    const { method } = req

    if(method === 'POST') {

        try {
            const UsersModel = Users()

            const {client} = req.body

            



            console.log(client)


            // return res.status(201).json({response})

        } catch(error) {

            console.error(error)
            return res.status(500).json({ message: error })
            
        }

    }

    // return res.status(405).json({ message: 'method Not allowed' })
}