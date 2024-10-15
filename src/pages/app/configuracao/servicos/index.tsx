import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { userContext } from '../../../../context/UserContext'
import { UserType } from '../../../../types/userType'
import Api from '../../../../../lib/api'
import Layout from '../../../../components/Layout'
import PlusIcon from '../../../../components/icons/PlusIcon'
import SpinnerIcon from '../../../../components/icons/SpinnerIcon'
import Router from 'next/router'
import BoxesIcon from '../../../../components/icons/BoxesIcon'


const Page: NextPage = () => {

  const { user } = userContext()

  const [ loading, setLoading ] = useState(false)

  const [ array, setArray ] = useState<UserType[]>([])

  function verifyPermission() {

    if(!user) return false

    if(user.role <= 100) return true

    false

  }

  const getData = async() => {

    try {
      
      const { response } = await Api.get('/api/auth/services')
  
      setArray(response)

    } catch (error) {
      
    } finally {

    }

  }

  function open(item?: UserType) {

    if(!verifyPermission()) return

    Router.push(`/app/configuracao/servicos/${item?.id || 'new'}`)

  }

  useEffect(()=>{

    getData()

  },[])

  return (
    <>
      <Layout page={'configuracao'}>
        <section>
          <article className="flex w-full justify-between py-2">

            <div className="flex justify-center items-center">
              <p className="text-3xl text-slate-600 font-semibold">Serviços</p>
            </div>

            <div className={`flex gap-3`}>
              <div onClick={() => open()} className={`flex justify-start items-center bg-orange-500 gap-2 p-3 cursor-pointer  rounded-xl duration-150 hover:scale-105 ${ !verifyPermission() ? 'hidden' : ''}`}>
                <PlusIcon width={22} height={22} fill={`white`}/>
                <p className={`text-white text-sm font-semibold`}>
                  Novo serviço
                </p>
              </div>
            </div>

          </article>
        </section>

        <section className="flex flex-col p-2 w-full h-full overflow-scroll bg-slate-100 border-solid border-[.2rem] border-white rounded-2xl">

          <div className={`flex w-full h-full justify-center items-center ${loading ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <span className="animate-ping">
                <SpinnerIcon className="h-12 w-12 animate-ping text-orange-500 fill-white"/>
            </span>
          </div>  

          <div className={`w-full flex flex-col ${!loading ? 'opacity-100' : 'opacity-0 hidden'}`}>

            {
              array && array.length && array.map((e, i) => {



                return (
                  <article key={i} onClick={() => open(e)} className={`flex items-center justify-between gap-2 bg-slate-100 w-full h-fit p-2 rounded-2xl cursor-pointer opacity-75 hover:opacity-100 hover:scale-x-[.97] duration-300`}>
                        
                    <section className="flex w-[50%] rounded-lg justify-start px-1 items-center gap-2">
                      <div className={`flex bg-orange-500 w-fit h-fit rounded-lg p-1.5`}>
                        <BoxesIcon width={18} height={18} fill={`white`} className='fill-white'/>
                      </div>
                      <div className="flex justify-center items-center overflow-hidden">
                        <p className="text-lg text-slate-600 font-bold truncate">{e.name}</p>
                      </div>
                    </section>

                  </article>
                )

              })
            }

          </div>

        </section>
          
      </Layout>
    </>
  )
}

export default Page
