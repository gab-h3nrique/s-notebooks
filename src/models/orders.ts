import prisma from "../../db/prisma"
import { Order } from "../../types/order"



export function Orders() {

    const createOrUpdateOrder = async(order:Order) => {
        const createdOrder = await prisma.orders.upsert({
            where: { id: order.id },
            update: {...order},
            create: { ...order},
        })
        return createdOrder
    }







    // export all function that is in the return
    return { createOrUpdateOrder }
}