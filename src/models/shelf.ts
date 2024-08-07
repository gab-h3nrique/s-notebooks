

import prisma from "../../db/prisma"
import { Shelf } from "../types/shelf"



function model() {

    const createOrUpdate = async(shelf: Shelf) => {

        const lastResult = await prisma.shelf.findFirst({
            where: {
                type: shelf.type ? { equals: shelf.type} : undefined,
                userId: shelf.userId ? { equals: shelf.userId} : undefined,
            },
            take: 1,
            orderBy: { id: 'desc'}
        })

        if(!lastResult || !lastResult.id) return null

        const shelfDb = <Shelf> await prisma.shelf.upsert({
            where: {id: shelf.id ? shelf.id : -1},
            create: {...shelf, id: (lastResult.id + 1), type: (shelf.type || 'manutencao'), userId: shelf.userId || undefined},
            update: {...shelf, id: (shelf.id || (lastResult.id + 1)), type: (shelf.type || 'manutencao'), userId: shelf.userId || undefined}
        })
        return shelfDb

    }

    const createOrUpdateRange = async(shelf: Shelf) => {

        const shelfDb = <Shelf> await prisma.shelf.upsert({
            where: {id: shelf.id ? shelf.id : -1},
            create: {...shelf, id: Number(shelf.id), type: (shelf.type || 'manutencao'), userId: shelf.userId || undefined},
            update: {...shelf, type: (shelf.type || 'manutencao'), userId: shelf.userId || undefined}
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

    const getPaginated = async(page?:number, limit?: number, type?: string, userId?: number) => {

        const startIndex = page && limit ? (page - 1) * limit : undefined

        const shelfDb = <Shelf[]> await prisma.shelf.findMany({
            where: {
                type: type ? { equals: type} : undefined,
                userId: type ? { equals: userId} : undefined,
            },
            skip: startIndex,
            take: limit || undefined,
            include:{ user: true, order: true },
            orderBy: { id: 'asc'}
        })

        return shelfDb

    }

    const deletetById = async(id:number) => {

        const deleted = <Shelf> await prisma.shelf.delete({
            where: { id: id}
        })

        return deleted

    }
    

    // export all function that is in the return
    return { firstEmptyShelf, getShelfEmptyByUser, createOrUpdate, createOrUpdateRange, get, getPaginated, deletetById }
}

export const Shelfs = model();
