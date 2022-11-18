

import prisma from "../../db/prisma"
import { Client } from "../types/client"
import { Shelf } from "../types/shelf"



function model() {

    const a = async(userId:number) => {
        const shelfDb = <Shelf> await prisma.shelf.findFirst({
            where: {
                userId: userId,
                order: { is: { id:{lte:1}}}
            }
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
    return { getFirstShelfEmpty }
}

export const Shelfs = model();
