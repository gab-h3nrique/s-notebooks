

import prisma from "../../db/prisma"
import { ClientType } from "../types/clientType"



function model() {

    const createClient = async(client:ClientType) => {
        const createdClient = await prisma.clients.create({
            data: {...client}
        })
        return createdClient
    }

    const createOrUpdateClient = async(client:ClientType) => {
        const createdClient = await prisma.clients.upsert({
            where: {email: client.email},
            create:{...client},
            update:{...client}
        })
        return createdClient
    }

    const searchClient = async(content:string) => {
        const clientFound = await prisma.clients.findMany({
            where: {
                OR: [
                    {email:{contains:content}},
                    {name:{contains:content}},
                    {document:{contains:content}},
                    {number:{contains:content}}
                ]
            }
        })
        return clientFound
    }
    const searchFirstClient = async(content:string | number) => {
        const clientFound = await prisma.clients.findFirst({
            where: {
                OR: [
                    { email: String(content) },
                    { name: String(content) },
                    { document: String(content) },
                    { number: String(content) }
                ]
            }
        })
        return clientFound
    }


    // export all function that is in the return
    return { createClient, createOrUpdateClient, searchClient, searchFirstClient }
}

export const Clients = model();
