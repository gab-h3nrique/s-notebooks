import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '../../../models/users'
import bcrypt from 'bcrypt'

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

    if(method === 'GET') {

        try {

            const { id } = req.query

            let response;

            if(id) response = await Users.getUserById(Number(id))
            if(!id) response = await Users.getAllUsers()


            return res.status(200).json({response})

        } catch(error:any) {

            console.error(error)
            return res.status(500).json({ message: error.message })
            
        }

    }

    if(method === 'POST') {

        try {

            const { user, newPassword } = req.body

            let formatedUser = { ...user }

            if(newPassword) formatedUser.password = await bcrypt.hash(newPassword, 2)

            const data = Users.upsert(formatedUser)

            return res.status(201).json({ data, success: true })

        } catch(error:any) {

            console.error(error)
            return res.status(500).json({ message: error.message, success: false })
            
        }

    }

    if(method === 'DELETE') {

        try {

            const { id } = req.query

            const data = Users.deleteUser(Number(id))

            return res.status(200).json({ data: data })

        } catch(error:any) {

            console.error(error)
            return res.status(500).json({ message: error.message, success: false })
            
        }

    }

    // return res.status(405).json({ message: 'method Not allowed' })
}