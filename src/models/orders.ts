import prisma from "../../db/prisma"
import { ClientType } from "../types/clientType"
import { OrderType } from "../types/orderType"


function model() {
    const createOrUpdateOrder = async(order:OrderType) => {
        // const { id, userId, clientId, ...order } = props
        const orderDb = <OrderType> await prisma.orders.upsert({
            where: { id: order.id ? order.id : -1 },
            update: {...order},
            create: {...order},
            include:{client:true, services:true, user:true, shelf:true}
        })
        return orderDb
    }

    const getAllOrders = async() => {
        const orderDb = <OrderType[]> await prisma.orders.findMany({
            include:{client:true, services:true, shelf:true}
        })
        return orderDb
    }

    const getOrderById = async(id:number) => {
        const orderDb = <OrderType> await prisma.orders.findUnique({
            where:{id:id},
            include:{client:true, services:true, user:true, shelf:true}
        })
        return orderDb
    }
    
    const getPageOrders = async(index: number, limit: number, status:any = '', userId:any = '', startDate:any = '', endDate:any = '') => {
        const orderDb = <OrderType[]> await prisma.orders.findMany({
            where: {
                status: status !== '' ? { equals: status} : undefined,
                userId: userId !== '' ? { equals: Number(userId)} : undefined,
                createdAt: {
                    gte: startDate !== '' ? new Date(startDate)  : undefined,
                    lte: endDate !== '' ? new Date(endDate) : undefined,
                },
                AND: status !== 'arquivado' ? { NOT: { status: 'arquivado'} } : {}
            },
            skip: index,
            take: limit,
            include:{client:true, services:true, user:true, shelf:true},
            orderBy: { id: 'desc'}
        })
        return orderDb
    }

    const getTotalOrders = async(index: number | undefined = undefined, limit: number | undefined = undefined, status:any = '', userId:any = '', startDate:any = '', endDate:any = '') => {
        const orderDb = <number> await prisma.orders.count({
            where: {
                status: status !== '' ? { equals: status} : undefined,
                userId: userId !== '' ? { equals: Number(userId)} : undefined,
                createdAt: {
                    gte: startDate !== '' ? new Date(startDate)  : undefined,
                    lte: endDate !== '' ? new Date(endDate) : undefined,
                },
                AND: status !== 'arquivado' ? { NOT: { status: 'arquivado'} } : {}
            },
            skip: index ? index : undefined,
            take: limit ? limit : undefined
        })
        return orderDb
    }

    const searchOrders = async(content:string | number) => {
        const clientFound = <OrderType[]> await prisma.orders.findMany({
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
            include:{client:true, services:true}
        })
        return clientFound
    }
    const searchByClient = async(clients:ClientType[]) => {
        const orderDb = <OrderType[]> await prisma.orders.findMany({
            where: { 
                clientId: {
                    in: clients.map((client:any) => client.id)
                }
            },
            include: {client:true, services:true, user:true},
        })
        return orderDb
    }

    const deletetOrderById = async(orderId:number) => {
        await prisma.servicesOrder.deleteMany({
            where: { orderId: orderId}
        })
        const deletedOrder = <OrderType> await prisma.orders.delete({
            where: { id: orderId}
        })
        return deletedOrder
    }

    // export all function that is in the return
    return { createOrUpdateOrder, getAllOrders, getPageOrders, getTotalOrders, searchOrders, searchByClient, getOrderById, deletetOrderById }
}

export const Orders = model();
