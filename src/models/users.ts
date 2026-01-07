import prisma from "../../db/prisma"
import { UserType } from "../types/userType"

function model() {

    const createUser = async(user:any) => {
        const userDb = await prisma.users.create({
            data: {...user}
        })
        return userDb
    }

    const upsert = async(user: UserType) => {
        const userDb = await prisma.users.upsert({
            where: { id: user.id ? user.id : -1 },
            create: user,
            update: user
        })
        return userDb
    }

    const getUserById = async(idParam:number) => {
        const userDb = await prisma.users.findFirst({
            where: { 
                id: idParam, 
                AND: { NOT: { deleted: true } }
            }
        })
        return userDb
    }
    const getUserByEmail = async(email: string) => {
        const userDb = await prisma.users.findFirst({
            where: { 
                email: email, 
                AND: { NOT: { deleted: true } }
            }
        })
        return userDb
    }

    const getAllUsers = async() => {
        const userDb = await prisma.users.findMany({
            where: {
                NOT: { deleted: true }
            },
            select: {id:true, name:true, email:true, role:true}
        })
        return userDb
    }

    const deleteUser = async(id: number) => {
        const userDb = await prisma.users.delete({
            where: { id: id }
        })
        return userDb
    }

    










    // export all function that is in the return
    return { query: prisma.users, createUser, upsert, getUserById, getAllUsers, deleteUser, getUserByEmail }
}
export const Users = model();