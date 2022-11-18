import type { NextApiRequest, NextApiResponse } from 'next'

import puppeteer from 'puppeteer'
import { Orders } from '../../models/orders'


export default async function handler( req: NextApiRequest,res: NextApiResponse<any>) {
    
    const { method } = req

    if(method === 'GET') {
        
        const { id } = req.query

        let orders;

        if(id) orders = await Orders.getOrderById(Number(id))
       
        return res.status(200).json({response: orders})
        
    }

}