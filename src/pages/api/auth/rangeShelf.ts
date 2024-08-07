import type { NextApiRequest, NextApiResponse } from 'next'
import { Shelfs } from '../../../models/shelf'
import { Users } from '../../../models/users'
import email from '../../../../lib/email'

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

            
            const type = req.body.type ? String(req.body.type) : ''
            const userId = req.body.userId ?  Number(req.body.userId) : undefined
            const start = req.body.start ? Number(req.body.start) : undefined
            const end = req.body.end ? Number(req.body.end) : undefined

            if(!start || !end) return res.status(500).json({ message: 'Todos os campos precisam ser preenchidos' })

            for(let i = start; i <= end; i++) {

                await Shelfs.createOrUpdateRange({id: i, type: type, userId: userId})

            }

            return res.status(201).json({ success: true })
            

        } catch(error:any) {

            console.error(error)
            return res.status(500).json({ message: error.message, success: false })
            
        }

    }

    return res.status(405).json({ message: 'method Not allowed' })
}