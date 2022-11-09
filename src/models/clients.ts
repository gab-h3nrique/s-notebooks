

import prisma from "../../db/prisma"
import { Client } from "../../types/client"
import { Order } from "../../types/order"



function model() {

    const createClient = async(client:Client) => {
        const createdClient = await prisma.clients.create({
            data: {...client}
        })
        return createdClient
    }

    const createOrUpdateClient = async(client:Client) => {
        const createdClient = await prisma.clients.upsert({
            where: {email: client.email},
            create:{...client},
            update:{...client}
        })
        return createdClient
    }


    // export all function that is in the return
    return { createClient, createOrUpdateClient }
}

export const Clients = model();
