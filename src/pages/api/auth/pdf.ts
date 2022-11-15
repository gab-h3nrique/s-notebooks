import type { NextApiRequest, NextApiResponse } from 'next'

import puppeteer from 'puppeteer'


export default async function handler( req: NextApiRequest,res: NextApiResponse<any>) {
    
    const { host } = req.headers
    const {id} = req.query

    if(!id) return res.status(500).send('esperando parametro id')

    const cookie = req.headers.cookie
    const token = <string> cookie?.replace('auth=', 'Bearer ');


    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    page.setExtraHTTPHeaders({
        Authorization: token
    })

    await page.goto(`http://${host}/orderPdf?id=${id}`, {  waitUntil: 'networkidle0' })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
    })

    // await browser.close()

    return res.setHeader("content-type", "application/pdf").send(pdf)
}