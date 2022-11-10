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
    
    const getPageOrders = async(index: number, limit: number) => {
        const orderDb = await prisma.orders.findMany({
            skip: index,
            take: limit,
            include:{client:true}
        })
        return orderDb
    }



    // export all function that is in the return
    return { createOrUpdateOrder, getAllOrders, getPageOrders }
}

export const Orders = model();
