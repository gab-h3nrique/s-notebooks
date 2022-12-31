import prisma from "../../db/prisma"
import { ServiceOrderType } from "../types/serviceType"

function model() {

    const getAllServices = async() => {
        const servicesOrderDb = <ServiceOrderType[]> await prisma.services.findMany()
        return servicesOrderDb
    }

    const createOrUpdate = async(services: ServiceOrderType[], orderIdParam: number) => {
        // const serviceArray: ServiceOrderType[] = <ServiceOrderType[]> services.map(obj => {
        //     obj.orderId =  orderIdParam;
        //     return obj
        // })
        // console.log('sdakfjlasdkjflk', serviceArray)
        // await prisma.servicesOrder.deleteMany({ where: { orderId: orderId } })

        // const a = await prisma.servicesOrder.createMany({
        //      data:serviceArray
        // })
        // return a;

        // está dando um problema que o parametro services está so trazendo oque o cara adicionou no momento 
        // porém quando o banco já contém algum serviço o banco está apagando ele
        // exemplo: 
        //  services = [ 3 ]
        //  banco = [ 1, 2]

        // no fim o banco está ficando 
        //  banco = [ 3 ]

        // const servicesDb = await prisma.servicesOrder.findMany({ where: { orderId: orderIdParam}})
        
        // const servicesToSave = [...servicesDb, ... services];

        // await prisma.servicesOrder.deleteMany({ where: { orderId: orderIdParam } })

        // servicesToSave.forEach(async ({id, name, status, orderId, value})=>{
        //     await prisma.servicesOrder.create({
        //         data: {name: name, status: status, orderId: orderIdParam, value: value }
        //     })
        // })
        // const servicesOrderDb = await prisma.orders.findUnique({
        //     select: { services: true },
        //     where: { id: orderIdParam }
        // })

        await prisma.servicesOrder.deleteMany({ where: { orderId: orderIdParam } })

        services.forEach(async ({id, name, status, orderId, value})=>{
            await prisma.servicesOrder.create({
                data: {name: name, status: status, orderId: orderIdParam, value: value }
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
