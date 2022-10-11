/* components */

import { useContext, useEffect, useState } from "react";
import { postApi } from "../../lib/api";
import { AuthContext } from "../context/auth";

/* components */

export interface UserNotes {
    id: Number;
    title: String,
    description: String
}


export default function CardAddItem({notes}:any) {
    const { userAuth }:any = useContext(AuthContext)

    const [users, setUsers] = useState([])

    const {}:UserNotes = notes

    const handleUser = async() => {
        const data = await postApi('/api/auth/users', {userAuth})
        console.log('data', data)
        // setUsers(data.users)
      }

    // useEffect(()=>{
    //     handleUser()
    // },[])

    return (
        <>
            <div className="default-card">
                <div className="flex h-96 w-full m-3 justify-center">
                    <div className="" >
                        <div className="text-sm text-center">
                            Adicionar novo item
                        </div>

                        <input  type="text" className="default-input h-8 text-center my-2" placeholder="Name" />
                        <input  type="text" className="default-input h-8 text-center my-2" placeholder="Classification" />
                        <input  type="text" className="default-input h-8 text-center my-2" placeholder="Description" />
                        <input  type="text" className="default-input h-8 text-center my-2" placeholder="Amount" />
                        <input  type="text" className="default-input h-8 text-center my-2" placeholder="Value" />

                        <select onFocus={()=>handleUser()} className="default-input h-8 text-center my-2">
                            <option className="default-input h-8 text-center my-2" value="">Select someone</option>
                            {

                            }
                        </select>
                        
                    </div>
                </div>
            </div>
        </>
    )
}