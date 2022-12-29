

import prisma from "../../db/prisma"
import { ServiceType } from "../types/serviceType"


function model() {

    const getAllServices = async() => {
        const serviceDb = <ServiceType[]> await prisma.services.findMany()
        return serviceDb
    }


    // export all function that is in the return
    return { getAllServices }
}

export const Services = model();
