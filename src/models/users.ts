import prisma from "../../db/prisma"

function model() {

    const getUserById = async(idParam:number) => {
        const user = await prisma.users.findFirst({
            where: { 
                id: idParam, 
            }
        })
        return user
    }

    const getAllUsers = async() => {
        const user = await prisma.users.findMany({select: {id:true, name:true, email:true, role:true}})
        return user
    }

    










    // export all function that is in the return
    return { getUserById, getAllUsers }
}
export const Users = model();