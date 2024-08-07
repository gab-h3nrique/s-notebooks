import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderType } from '../../../../types/orderType'
import { ClientType } from '../../../../types/clientType'
import { ServiceOrderType } from '../../../../types/serviceType'
import email from '../../../../../lib/email'

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

            
            const to: string = req.body.to
            const subject: string = req.body.subject
            const html: string = req.body.html


            // email.send('gabrielbielrique10@gmail.com', subject, html)

            const info = await email.send({to: 'gabrielbielrique10@gmail.com', subject: subject, html: html})

            console.log('info: ', info)

            return res.status(201).json({ success: true })
            

        } catch(error:any) {

            console.error(error)
            return res.status(500).json({ message: error.message, success: false })
            
        }

    }

    return res.status(405).json({ message: 'method Not allowed' })
}