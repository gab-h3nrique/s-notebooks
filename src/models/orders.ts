import prisma from "../../db/prisma"
import { Order } from "../../types/order"



function model() {

    const createOrUpdateOrder = async(order:Order) => {
        const orderDb = await prisma.orders.upsert({
            where: { id: order.id ? order.id : -1 },
            update: {...order},
            create: { ...order},
        })
        return orderDb
    }

    const getAllOrders = async() => {
        const orderDb = await prisma.orders.findMany({
            include:{client:true}
        })
        return orderDb
    }

    // export all function that is in the return
    return { createOrUpdateOrder, getAllOrders }
}

export const Orders = model();
