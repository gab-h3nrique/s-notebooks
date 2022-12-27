

import prisma from "../../db/prisma"
import { Shelf } from "../types/shelf"



function model() {

    const createOrUpdate = async(idShelf:number, userId:number,) => {
        const shelfDb = <Shelf> await prisma.shelf.upsert({
            where: { id: idShelf},
            update: { userId: userId },
            create: { id: idShelf, type: 'manutencao', userId: userId}
        })
        return shelfDb
    }

    const getFirstShelfEmpty = async(userId:number) => {
        const shelfDb = <Shelf> await prisma.shelf.findFirst({
            where: {
                userId: userId,
                order: {
                    is: null
                }
            }
        })
        return shelfDb
    }


    // export all function that is in the return
    return { getFirstShelfEmpty, createOrUpdate }
}

export const Shelfs = model();
