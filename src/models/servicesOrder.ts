import prisma from "../../db/prisma"
import { ServiceOrderType } from "../types/serviceType"

function model() {

    const getAllServices = async() => {
        const servicesOrderDb = <ServiceOrderType[]> await prisma.services.findMany()
        return servicesOrderDb
    }

    const createOrUpdate = async(services: ServiceOrderType[], orderIdParam: number) => {
        // const serviceArray = services.map(obj => {
        //     obj.orderId =  orderId;
        //     return obj
        // })
        // console.log('sdakfjlasdkjflk', serviceArray)
        // await prisma.servicesOrder.deleteMany({ where: { orderId: orderId } })

        // const servicesOrderDb = await prisma.servicesOrder.createMany({ data:serviceArray})
        // return servicesOrderDb;
        await prisma.servicesOrder.deleteMany({ where: { orderId: orderIdParam } })

        services.forEach(async ({id, name, status, orderId, value})=>{
            await prisma.servicesOrder.upsert({
                where: {id: id? id: -1},
                update: {name: name, status: status, orderId: orderIdParam, value: value },
                create: {name: name, status: status, orderId: orderIdParam, value: value }
            })
        })
        const servicesOrderDb = await prisma.orders.findUnique({
            select: { services: true },
            where: { id: orderIdParam }
        })

        return servicesOrderDb
    }

    // export all function that is in the return
    return { getAllServices, createOrUpdate }
}

export const ServicesOrder = model();
