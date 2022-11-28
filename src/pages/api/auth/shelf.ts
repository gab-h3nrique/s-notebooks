import type { NextApiRequest, NextApiResponse } from 'next'
import { Shelfs } from '../../../models/shelf'
import { Users } from '../../../models/users'

export default async function handler( req: NextApiRequest,res: NextApiResponse<Object>) {
    
    const { method } = req

    if(method === 'POST') {

        try {

            const { userId, start, end } = req.body
            console.log(req.body)

            if(!userId || !start || !end) return res.status(500).json({ message: 'Todos os campos precisam ser preenchidos' })
            
            for(let i=start; i <= end; i++) {
                await Shelfs.createOrUpdate(i, userId)
            }

            return res.status(201).json({message:'plateleiras atualizadas'})

        } catch(error) {

            console.error(error)
            return res.status(500).json({ message: error })
            
        }

    }

    // return res.status(405).json({ message: 'method Not allowed' })
}