

import prisma from "../../db/prisma"
import { ServiceType } from "../types/serviceType"


function model() {

    const getAllServices = async() => {
        const serviceDb = <ServiceType[]> await prisma.services.findMany({ orderBy: { id: 'desc' }})
        return serviceDb
    }

    const getById = async(idParam:number) => {
        const serviceDb = await prisma.services.findFirst({
            where: { 
                id: idParam,
            }
        })
        return serviceDb
    }

    const deleteService = async(id: number) => {
        const serviceDb = await prisma.services.delete({
            where: { id: id }
        })
        return serviceDb
    }

    const upsert = async(service: ServiceType) => {
        const serviceDb = await prisma.services.upsert({
            where: { id: service.id ? service.id : -1 },
            create: service,
            update: service
        })
        return serviceDb
    }


    // export all function that is in the return
    return { getAllServices, getById, deleteService, upsert }
}

export const Services = model();
