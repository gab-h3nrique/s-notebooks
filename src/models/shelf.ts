

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

    const getShelfEmptyByUser = async(userId:number, type?:string) => {
        const shelfDb = <Shelf> await prisma.shelf.findFirst({
            where: {
                userId: userId,
                type: type ? type : undefined,
                order: {
                    is: null
                }
            }
        })
        return shelfDb
    }

    const firstEmptyShelf = async(type:string) => {
        const shelfDb = <Shelf> await prisma.shelf.findFirst({
            where: {
                type: type,
                order: {
                    is: null
                }
            }
        })
        return shelfDb
    }

    const get = async(id:number, type?:string) => {
        const shelfDb = <Shelf> await prisma.shelf.findFirst({
            where: {
                id: id,
                type: type ? type : undefined,
            }
        })
        return shelfDb
    }
    

    // export all function that is in the return
    return { firstEmptyShelf, getShelfEmptyByUser, createOrUpdate, get }
}

export const Shelfs = model();
