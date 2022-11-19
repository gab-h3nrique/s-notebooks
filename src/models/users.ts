import prisma from "../../db/prisma"

function model() {

    const createUser = async(user:any) => {
        const userDb = await prisma.users.create({
            data: {...user}
        })
        return userDb
    }

    const getUserById = async(idParam:number) => {
        const userDb = await prisma.users.findFirst({
            where: { 
                id: idParam, 
            }
        })
        return userDb
    }

    const getAllUsers = async() => {
        const userDb = await prisma.users.findMany({select: {id:true, name:true, email:true, role:true}})
        return userDb
    }

    










    // export all function that is in the return
    return { createUser, getUserById, getAllUsers }
}
export const Users = model();