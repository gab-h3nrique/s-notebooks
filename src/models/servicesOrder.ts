import prisma from "../../db/prisma"
import { ServiceOrderType } from "../types/serviceType"

function model() {

    const getAllServices = async() => {
        const servicesOrderDb = <ServiceOrderType[]> await prisma.services.findMany()
        return servicesOrderDb
    }

    const createManyByOrderId = async(serviceOrder: ServiceOrderType[], orderId: number) => {

        const serviceOrderWithOrderId = serviceOrder.map((serviceOrder:ServiceOrderType) => {return { ...serviceOrder, orderId: orderId } })
        
        const servicesOrderDb = await prisma.servicesOrder.createMany({
            data: serviceOrderWithOrderId
        })

        return servicesOrderDb
    }

    const createOrUpdate = async(serviceOrder: any) => {
        
        const servicesOrderDb = <ServiceOrderType> await prisma.servicesOrder.upsert({
            where: { id: serviceOrder.id ? serviceOrder.id : -1 },
            update: {...serviceOrder},
            create: {...serviceOrder},
        })

        return servicesOrderDb
    }

    const deleteManyByrId = async(serviceId: number) => {

        const servicesOrderDb = await prisma.servicesOrder.deleteMany({ where: { id: serviceId } })
        return servicesOrderDb

    }
  
    return { getAllServices, createManyByOrderId, createOrUpdate,  deleteManyByrId }
}

export const ServicesOrder = model();
