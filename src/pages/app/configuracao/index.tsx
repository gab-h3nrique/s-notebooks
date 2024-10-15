import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { start } from 'repl'
import Router from 'next/router';
import Layout from '../../../components/Layout'
import Api from '../../../../lib/api'

interface User {
  id: number;
  name: string;
  email: string;
  role: number
}
interface Shelf {
  start: any;
  end: any;
}

const Configuracao: NextPage = () => {


  const [dropdownOrderInfo, setDropdownOrderInfo] = useState<boolean>(false)
  const [userArray, setUserArray] = useState<User[]>()
  const [user, setUser] = useState<User>()
  const [shelf, setShelf] = useState<Shelf>({start: null, end: null})
  const [message, setMessage] = useState<string>()

  const [loading, setLoading] = useState<boolean>(false)

  const getUsers = async() => {
    const {response:user} = await Api.get('/api/auth/users')

    return user
  }

  const handleChangeShelf = async() => {
    setLoading(true)
    const {message} = await Api.post('/api/auth/shelf', {userId: user?.id, start: Number(shelf.start), end: Number(shelf.end)})
    setMessage(message)
    setLoading(false)
  }

  useEffect(()=>{

    (async()=>{
      setUserArray(await getUsers())
    })()

  },[])

  return (
    <>
      <Layout page={'configuracao'}>

      <article className="flex flex-col w-full justify-between py-2">

        <section className="flex items-center">
          <p className="text-3xl text-slate-600 font-semibold">Configuração</p>
        </section>

        <section className='flex mt-4 p-2 gap-4'>

          <article onClick={()=>{Router.push('/app/configuracao/prateleiras')}} className='flex flex-col bg-white p-4 gap-3 rounded-lg cursor-pointer hover:scale-105 duration-150'>

            <p className="text-xl text-slate-400 font-semibold ">Prateleira</p>
            <p className="text-sm text-slate-400 font-semibold ">Configure as prateleiras do sistema</p>


          </article>

          <article onClick={()=>{Router.push('/app/configuracao/usuarios')}} className='flex flex-col bg-white p-4 gap-3 rounded-lg cursor-pointer hover:scale-105 duration-150'>

            <p className="text-xl text-slate-400 font-semibold ">Usuários</p>
            <p className="text-sm text-slate-400 font-semibold ">Configure os usuários do sistema</p>


          </article>

          <article onClick={()=>{Router.push('/app/configuracao/servicos')}} className='flex flex-col bg-white p-4 gap-3 rounded-lg cursor-pointer hover:scale-105 duration-150'>

            <p className="text-xl text-slate-400 font-semibold ">Serviços</p>
            <p className="text-sm text-slate-400 font-semibold ">Configure os serviços do sistema</p>


          </article>

        </section>

      </article>




        {/* <HeaderContent title={'Configuração'}>
          <div></div>
        </HeaderContent>

        <ContentSection className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-2`}>


          <div className="col-span-1 flex">
            <div className="flex w-full h-full bg-white rounded-2xl">
              <div className="flex flex-col justify-start bg-white w-full p-4 gap-4 rounded-2xl">
                  <section className="flex items-center gap-1">
                      <p className="text-xl text-slate-400 font-semibold ">Prateleira</p>
                  </section>

                  <section className="flex items-center justify-center gap-1">
                      <p className="text-lg text-slate-400 font-semibold ">Range</p>
                  </section>

                  <section className="flex flex-col justify-center items-center gap-1 px-2">

                    <div className="w-full">
                      <label className="block text-sm font-medium text-slate-500">Inicio</label>
                      <input type="number" onChange={(e)=>setShelf({...shelf, start: e.target.value })} value={shelf.start} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
                    </div>
                    <div  className="w-full">
                      <label className="block text-sm font-medium text-slate-500">Final</label>
                      <input type="number" onChange={(e)=>setShelf({...shelf, end: e.target.value })} value={shelf.end} className="text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder=""/>
                    </div>

                    <div className="w-full">
                      <div className="">
                          <label className="block text-sm font-medium text-slate-500">Técnico responsável</label>
                          <button type="button" onClick={()=> setDropdownOrderInfo(!dropdownOrderInfo)} className="flex justify-between px-5 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 p-1 border-2 border-gray-300 outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150">
                            <label className="block text-sm font-medium text-slate-500">
                                {
                                    userArray ?
                                        userArray.map(({id, name})=>{return user?.id === id ? name : null})
                                        : null
                                }
                            </label>
                            
                            <svg className={`-mr-1 ml-2 h-5 w-5 ${dropdownOrderInfo ? "rotate-[-180deg]" : "rotate-[0deg]"} duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                            </svg>
                          </button>
                      </div>

                      <div className={`${!dropdownOrderInfo ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"} duration-150 absolute z-10 w-56 origin-top-right rounded-md bg-white shadow-2xl`} >
                          <div className="py-1" >
                              <>
                                  {
                                    userArray ? 
                                      userArray.map((user)=>{
                                          return <a key={user.id} onClick={()=>{setDropdownOrderInfo(!dropdownOrderInfo); setUser(user)}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{user.name}</a>
                                      })
                                    : null
                                  }
                              </>
                          </div>
                      </div>
                    </div>

                    <div  className="w-full">
                      <label className="flex text-sm font-medium text-red-500 justify-center p-2">{message && message}&nbsp;</label>
                      <button onClick={()=> handleChangeShelf()} className={`flex justify-center items-center bg-orange-500 gap-2 cursor-pointer w-full rounded-2xl py-2 px-3 duration-150 hover:scale-y-110 text-white`}>
                        {loading && <SpinnerIcon className="h-5 w-5 text-orange-300 fill-white"/> } 
                        <p className={`duration-500`}>
                            {!loading ? 'salvar' : 'Salvando . . .'}
                        </p>
                        </button>
                    </div>

                  </section>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex">
            <div className="flex w-full h-full bg-white rounded-2xl">

            </div>
          </div>

          <div className="col-span-1 flex">
            <div className="flex w-full h-full bg-white rounded-2xl">

            </div>
          </div>
          <div className="col-span-1 flex">
            <div className="flex w-full h-full bg-white rounded-2xl">

            </div>
          </div>
          <div className="col-span-1 flex">
            <div className="flex w-full h-full bg-white rounded-2xl">

            </div>
          </div>
          <div className="col-span-1 flex">
            <div className="flex w-full h-full bg-white rounded-2xl">

            </div>
          </div>
        </ContentSection> */}


      </Layout>
    </>
  )
}

export default Configuracao
