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

            // const { id, type, userId, start, end } = req.body

            // const id = req.query.id ? Number(req.query.id) : undefined
            // const type = req.query.type ?  String(req.query.type) : undefined
            // const userId = req.query.userId ? Number(req.query.userId) : undefined

            // if(!userId || !start || !end) return res.status(500).json({ message: 'Todos os campos precisam ser preenchidos' })
            
            // for(let i=start; i <= end; i++) {
            //     await Shelfs.createOrUpdate(i, userId)
            // }

            const shelf: any = {
                id: req.body.id ? Number(req.body.id) : undefined,
                type: req.body.type ?  String(req.body.type) : undefined,
                userId: req.body.userId ? Number(req.body.userId) : undefined
            }

            const shelfdB = await Shelfs.createOrUpdate(shelf)

            return res.status(201).json({ shelfdB })

        } catch(error:any) {

            console.error(error)
            return res.status(500).json({ message: error.message })
            
        }

    }

    if(method === 'GET') {

        try {

            const type = req.query.type ?  String(req.query.type) : undefined
            const userId = req.query.userId ? Number(req.query.userId) : undefined
            const page = req.query.page ? Number(req.query.page) : undefined
            const limit = req.query.limit ? Number(req.query.limit) : undefined

            const shelf = await Shelfs.getPaginated(page, limit, type, userId );

            return res.status(200).json({ shelf: shelf || [] })

        } catch(error:any) {

            console.error(error)
            return res.status(500).json({ message: error.message })
            
        }

    }

    if(method === 'DELETE') {

        try{
        
            const { id } = req.query

            if(!id) return res.status(500).json({ message: 'is missing id' })

            const deleted = await Shelfs.deletetById(Number(id))

            return res.status(200).json({ success: true })

        } catch(error:any) {

            console.error(error)
            return res.status(200).json({ success: false })
            
        }
        
    }

    // return res.status(405).json({ message: 'method Not allowed' })
}