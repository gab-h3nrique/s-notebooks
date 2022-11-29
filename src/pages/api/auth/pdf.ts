import type { NextApiRequest, NextApiResponse } from 'next'

// import puppeteer from 'puppeteer'

// import chromium from "chrome-aws-lambda";
// import playwright from "playwright-core";

// https://www.umuttufanoglu.dev/blog/puppeteer-nextjs
// https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images
export default async function handler( req: NextApiRequest,res: NextApiResponse<any>) {
    
    // const { host } = req.headers
    // const {id} = req.query

    // if(!id) return res.status(500).send('esperando parametro id')

    // const cookie = req.headers.cookie
    // const token = <string> cookie?.replace('auth=', 'Bearer ');


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

    // try {
    //     const browser = await playwright.chromium.launch({
    //       args: [...chromium.args, "--font-render-hinting=none"], // This way fix rendering issues with specific fonts
    //       executablePath:
    //         process.env.NODE_ENV === "production"
    //           ? await chromium.executablePath
    //           : "/usr/local/bin/chromium",
    //       headless:
    //         process.env.NODE_ENV === "production" ? chromium.headless : true,
    //     });
    
    //     const context = await browser.newContext();
    
    //     const page = await context.newPage();
    
    //     // This is the path of the url which shall be converted to a pdf file
    //     const pdfUrl =
    //       process.env.NODE_ENV === "production"
    //         ? "https://your.app/pdf"
    //         : "http://localhost:3000/pdf";
    
    //     await page.goto(`http://${host}/orderPdf?id=${id}`, {
    //       waitUntil: "load",
    //     });
    
    //     const pdf = await page.pdf({
    //       path: "/tmp/awesome.pdf", // we need to move the pdf to the tmp folder otherwise it won't work properly
    //       printBackground: true,
    //       format: "a4",
    //     });
    //     await browser.close();
    
    //     return res.status(200).json({ pdf });

    //   } catch (error) {
    //     return res.status(500).json({ error: error });
    //   }


}