import prisma from "../../db/prisma"
import { Order } from "../types/order"


function model() {

    const createOrUpdateOrder = async(order:Order) => {
        const orderDb = <Order> await prisma.orders.upsert({
            where: { id: order.id ? order.id : -1 },
            update: {...order},
            create: { ...order},
        })
        return orderDb
    }

    const getAllOrders = async() => {
        const orderDb = <Order[]> await prisma.orders.findMany({
            include:{client:true}
        })
        return orderDb
    }

    const getOrderById = async(id:number) => {
        const orderDb = <Order> await prisma.orders.findUnique({
            where:{id:id},
            include:{client:true},
        })
        return orderDb
    }
    
    const getPageOrders = async(index: number, limit: number) => {
        const orderDb = <Order[]> await prisma.orders.findMany({
            skip: index,
            take: limit,
            include:{ client:true },
            orderBy: { id: 'desc'}
        })
        return orderDb
    }

    const getTotalOrders = async(index: number | undefined = undefined, limit: number | undefined = undefined) => {
        const orderDb = <number> await prisma.orders.count({
            skip: index ? index : undefined,
            take: limit ? limit : undefined
        })
        return orderDb
    }

    const searchOrders = async(content:string | number) => {
        const clientFound = <Order[]> await prisma.orders.findMany({
            where: {
                OR: [
                    { id: Number(content) },
                    { clientId: Number(content) },
                    { userId: Number(content) },
                    { status: {contains: String(content)} },
                    { model: {contains:String(content)} },
                    { brand: {contains:String(content)} },
                    { serialNumber: {contains:String(content)} },
                    { serialNumber: {contains:String(content)} },
                ]
            },
            include:{ client:true }
        })
        return clientFound
    }
    const searchByClient = async(clientId:number) => {
        const clientFound = <Order[]> await prisma.orders.findMany({
            where: { clientId: clientId},
            include:{ client:true }
        })
        return clientFound
    }

    // export all function that is in the return
    return { createOrUpdateOrder, getAllOrders, getPageOrders, getTotalOrders, searchOrders, searchByClient, getOrderById }
}

export const Orders = model();
