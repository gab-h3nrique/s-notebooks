import type { NextApiRequest, NextApiResponse } from 'next'

import puppeteer from 'puppeteer'
import { Orders } from '../../models/orders'


export default async function handler( req: NextApiRequest,res: NextApiResponse<any>) {
    
    const { method } = req

    if(method === 'GET') {
        
        const { id } = req.query

        const page = Number(req.query.page)
        const limit = Number(req.query.limit)

        let orders;

        if(id) orders = await Orders.getOrderById(Number(id))
        if(!id) orders = await Orders.getAllOrders()
        
        if(!page || !limit)  return res.status(200).json({response: orders})

        const startIndex = (page - 1) * limit
        
        const response = {
            currentPage: page,
            total: await Orders.getTotalOrders(),
            totalPages: Math.ceil(await Orders.getTotalOrders() / limit),
            results: await Orders.getPageOrders(startIndex, limit)
        }
        
        response.results = await Orders.getPageOrders(startIndex, limit)

        return res.status(200).json({response: response})
        
    }

}