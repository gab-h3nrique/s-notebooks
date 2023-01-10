import type { NextApiRequest, NextApiResponse } from 'next'
import { Shelfs } from '../../../models/shelf'
import { Users } from '../../../models/users'

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

    if(method === 'POST') {

        try {

            const { userId, start, end } = req.body

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