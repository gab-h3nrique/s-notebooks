import type { NextApiRequest, NextApiResponse } from 'next'

import puppeteer from 'puppeteer'


export default async function handler( req: NextApiRequest,res: NextApiResponse<any>) {
    
    const { host } = req.headers
    const {id} = req.query

    if(!id) return res.status(500).send('esperando parametro id')

    const cookie = req.headers.cookie
    const token = <string> cookie?.replace('auth=', 'Bearer ');


    (async () => {
        const PCR = require("puppeteer-chromium-resolver");
        const option = {
            revision: "",
            detectionPath: "",
            folderName: ".chromium-browser-snapshots",
            defaultHosts: ["https://storage.googleapis.com", "https://npm.taobao.org/mirrors"],
            hosts: [],
            cacheRevisions: 2,
            retry: 3,
            silent: false
        };

        const locateChrome = require('locate-chrome');
        const executablePath = await new Promise(resolve => locateChrome((arg: any) => resolve(arg)));

        const stats = await PCR(option);
        const browser = await stats.puppeteer.launch({
            headless: false,
            args: ["--no-sandbox"],
            executablePath: executablePath
        }).catch(function(error:any) {
            console.log(error);
        });



        const page = await browser.newPage();
        page.setExtraHTTPHeaders({
            Authorization: token
        })
        await page.goto(`http://${host}/orderPdf?id=${id}`, {  waitUntil: 'networkidle0' })
        const pdf = await page.pdf({
            printBackground: true,
            format: 'Letter',
        })
        await browser.close();

        return res.setHeader("content-type", "application/pdf").send(pdf)


    })();


    // const browser = await puppeteer.launch()
    // const page = await browser.newPage()
    
    // page.setExtraHTTPHeaders({
    //     Authorization: token
    // })

    // await page.goto(`http://${host}/orderPdf?id=${id}`, {  waitUntil: 'networkidle0' })

    // const pdf = await page.pdf({
    //     printBackground: true,
    //     format: 'Letter',
    // })

    // await browser.close()

    // return res.setHeader("content-type", "application/pdf").send(pdf)
}