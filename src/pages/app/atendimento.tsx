import type { GetStaticPaths, GetServerSideProps, NextPage } from 'next'
/* hooks */
import React, { useEffect, useState } from 'react'
import Api from '../../../lib/api'
import AngleUpIcon from '../../components/icons/AngleUpIcon'

/* components */
import PasteIcon from '../../components/icons/PasteIcon'
import PlusIcon from '../../components/icons/PlusIcon'
import Layout from '../../components/Layout'
import NewOrderModal from '../../components/modals/NewOrderModal'
import InfoCard from '../../components/pages/atendimentos/InfoCard'
import OrderList from '../../components/pages/atendimentos/OrdersList'
import Paginate from '../../components/pages/Paginate'
import IconMenu from '../../components/barComponent/IconMenu'
import SearchIcon from '../../components/icons/SearchIcon'
import SpinnerIcon from '../../components/icons/SpinnerIcon'
import { OrderType } from '../../types/orderType'
import CalendarIcon from '../../components/icons/CalendarIcon'
import WrenchIcon from '../../components/icons/WrenchIcon'
import { UserType } from '../../types/userType'
import NewPaginate from '../../components/pages/NewPaginate'
import SortIcon from '../../components/icons/SortIcon'
import BookmarkIcon from '../../components/icons/BookmarkIcon'
/* components */

interface PagConfig {
  currentPage: number;
  next: number;
  previous: number;
  total: number;
  totalPages: number;
}

interface DropdownFilter {
  status: boolean;
  technician: boolean;
  startDate: boolean;
  endDate: boolean;
}

interface SearchFilter {
  status: string;
  userId: string;
  startDate: string;
  endDate: string;
}

const Atendimento: NextPage = () => {

  const maxLimit:number = 25

  const [newOrderModal, setNewOrderModal] = useState<boolean>(false)

  const [arrayOrder, setArrayOrder] = useState<any[]>()
  const [userArray, setUserArray] = useState<UserType[]>()
 
  const [total, setTotal] = useState<number>()
  const [page, setPage] = useState<number>()

  const [search, setSearch] = useState<string>("")
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({ status: '', userId: '', startDate: '', endDate: '' })

  const [orderId, setOrderId] = useState<number | null>()

  const [loading, setLoading] = useState<boolean>(false)
  
  
  
  const [dropdown, setDropdown] = useState<DropdownFilter>({ status: false, technician: false, startDate: false, endDate: false })
  
  // PROVISORIO APENAS PARA MUDAR O TIPO DO LAYOUT //
  const [layout, setLayout] = useState<boolean>(false)
  function handleLayout(param:boolean) {
    setLayoutStorage(param)
    setLayout(getLayout())
  }

  function setLayoutStorage(param:boolean) {
    localStorage.setItem('layout', JSON.stringify(param));
  }
  function getLayout():boolean {
      return JSON.parse(localStorage.getItem('layout') as string)
  }
  // ----------------------------------------------- //

  const getOrders = async(page:number, limit:number) => {

    setLoading(true)
    const {response} = await Api.get('/api/auth/orders', {page, limit, status: searchFilter?.status, userId: searchFilter?.userId, startDate: searchFilter?.startDate, endDate: searchFilter?.endDate})
    setTotal(response.totalPages)
    setPage(response.currentPage)
    setArrayOrder(response.results)
    setLoading(false)
  }

  const getUsers = async() => {

    const {response:users} = await Api.get('/api/auth/users')
    setUserArray(users)

  }

  const pageHandle = async(paramPage:number) => {
    await getOrders(paramPage, maxLimit)
  }
  const orderHandle = async() => {
    await getOrders(page ? page : 1, maxLimit).then(()=>setNewOrderModal(false))
  }

  const handleSearch = async() => {
    const {response} = await Api.get('/api/auth/search/orders',{content: search})
    setArrayOrder(response)
  }

  const deleteOrder = async(orderId?:number) => {
    if(!orderId) return;

    const { response, ...error } = await Api.delete('/api/auth/orders', { id: orderId })

    if(!response.id) return console.log(error.message)

    await orderHandle()
  }

  useEffect(()=>{
    (async () => {
      if (typeof window !== "undefined") handleLayout(getLayout())
      await getOrders(1, maxLimit)
      await getUsers()
      
    })()
  },[])

  return (
    <Layout page={'atendimento'}>
        <section>
          <article className="flex w-full justify-between py-2">

            <div onClick={() => handleLayout(!getLayout())}className="flex justify-center items-center">
              <p className="text-3xl text-slate-600 font-semibold">Atendimentos</p>
            </div>

            <div className="flex gap-3">
              <div className={`flex justify-center items-center gap-2 cursor-pointer rounded-2xl p-3 duration-150 hover:scale-105 bg-slate-100 border-solid border-[.2rem] border-white`}>
                  <div  onClick={() => handleSearch()} className="w-fit h-fit">
                    <SearchIcon width={20} height={20} fill={`#94a3b8`}/>
                  </div>
                  
                  <input 
                    onKeyUp={(e) => e.key === 'Enter' && handleSearch()} 
                    onChange={(x)=> setSearch(x.target.value)} value={search}
                    type="text" className={`text-slate-500 bg-slate-100 outline-0 text-sm font-semibold duration-500 w-full`}/>

              </div>

              <div onClick={() => {setOrderId(null); setNewOrderModal(!newOrderModal)}} className={`flex justify-start items-center bg-orange-500 gap-2 p-3 cursor-pointer  rounded-2xl duration-150 hover:scale-105`}>
                      <PlusIcon width={22} height={22} fill={`white`}/>
                  <p className={`text-white text-sm font-semibold`}>
                      Novo atendimento
                  </p>
              </div>
            </div>


            
          </article>
        </section>
        
        <section className="">
          
          {/* <article className="flex w-full gap-4"> */}
          <article className="flex w-full justify-start gap-4">

            <div onClick={()=> setDropdown({...dropdown, technician: false, status: !dropdown.status})} className="flex relative items-center justify-center bg-slate-100 rounded-2xl w-32 p-1 gap-2 border-solid border-[.2rem] border-white duration-150 group cursor-default">
              <BookmarkIcon className="h-[18px] w-[18px] fill-slate-400 group-hover:fill-orange-500 duration-150"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{searchFilter.status ? searchFilter.status : 'status'}</p>
              </div>

                <div className={`absolute w-fit top-10 z-10 duration-150 rounded-md bg-white shadow-2xl overflow-hidden text-ellipsis whitespace-nowrap ${!dropdown.status ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"}`} >
                  <div className="py-1" >

                      <a onClick={()=>{setDropdown({...dropdown, status: !dropdown.status}); setSearchFilter({...searchFilter, status: ''})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{'todos'}</a>
                      <a onClick={()=>{setDropdown({...dropdown, status: !dropdown.status}); setSearchFilter({...searchFilter, status: 'aguardando'})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{'aguardando'}</a>
                      <a onClick={()=>{setDropdown({...dropdown, status: !dropdown.status}); setSearchFilter({...searchFilter, status: 'aprovado'})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{'aprovado'}</a>
                      <a onClick={()=>{setDropdown({...dropdown, status: !dropdown.status}); setSearchFilter({...searchFilter, status: 'reprovado'})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{'reprovado'}</a>
                      <a onClick={()=>{setDropdown({...dropdown, status: !dropdown.status}); setSearchFilter({...searchFilter, status: 'finalizado'})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{'finalizado'}</a>
                      <a onClick={()=>{setDropdown({...dropdown, status: !dropdown.status}); setSearchFilter({...searchFilter, status: 'arquivado'})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{'arquivado'}</a>

                  </div>
                </div>
            </div>

            <div onClick={()=> setDropdown({...dropdown,status: false, technician: !dropdown.technician})} className="flex relative items-center justify-center bg-slate-100 rounded-2xl w-32 p-1 gap-2 border-solid border-[.2rem] border-white duration-150 group cursor-default">
              <WrenchIcon className="h-[18px] w-[18px] fill-slate-400 group-hover:fill-orange-500 duration-150"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {
                      searchFilter.userId ?
                      userArray?.map(({id, name})=>{return Number(searchFilter.userId) === id ? name : null})
                      : 'técnico'
                    }
                  </p>
              </div>

                <div className={`absolute w-fit top-10 z-10 duration-150 rounded-md bg-white shadow-2xl overflow-hidden text-ellipsis whitespace-nowrap ${!dropdown.technician ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto"}`} >
                  <div className="py-1" >
                      <>
                      <a onClick={()=>{setDropdown({...dropdown, technician: !dropdown.technician}); setSearchFilter({...searchFilter, userId: ''})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{'todos'}</a>
                          {
                              userArray ? 
                                  userArray.map(({id, name})=>{
                                      return <a key={id} onClick={()=>{setDropdown({...dropdown, technician: !dropdown.technician}); setSearchFilter({...searchFilter, userId: String(id)})}} className=" block px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:scale-105 duration-150 cursor-pointer rounded-lg" >{name}</a>
                                  })
                                  : null
                          }
                      </>
                  </div>
                </div>

            </div>

            <div onClick={()=> setDropdown({...dropdown, status: false, technician: false})} className="flex relative items-center justify-center bg-slate-100 rounded-2xl w-32 p-1 gap-2 cursor-pointer border-solid border-[.2rem] border-white hover:scale-105 duration-150 group">
              <CalendarIcon className="h-[18px] w-[18px] fill-slate-400 group-hover:fill-orange-500 duration-150"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{searchFilter.startDate ? searchFilter.startDate : 'data início'}</p>
              </div>
              <input onChange={(e)=> setSearchFilter({...searchFilter, startDate: e.target.value})} type='date' className="absolute w-1 h-1 scale-x-[30] scale-y-[10] opacity-0 cursor-pointer"/>
            </div>

            <div onClick={()=> setDropdown({...dropdown, status: false, technician: false})} className="flex relative items-center justify-center bg-slate-100 rounded-2xl w-32 p-1 gap-2 cursor-pointer border-solid border-[.2rem] border-white hover:scale-105 duration-150  group">
              <CalendarIcon className="h-[18px] w-[18px] fill-slate-400 group-hover:fill-orange-500"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{searchFilter.endDate ? searchFilter.endDate : 'data final'}</p>
              </div>
              <input onChange={(e)=> setSearchFilter({...searchFilter, endDate: e.target.value})} type='date' className="absolute w-1 h-1 scale-x-[30] scale-y-[10] opacity-0 cursor-pointer"/>
            </div>

            <div onClick={()=>{pageHandle(1); setDropdown({...dropdown, status: false, technician: false})}} className="flex items-center justify-center bg-orange-500 rounded-2xl w-32 p-[9px] gap-2 cursor-pointer hover:scale-105 duration-150">
              <SortIcon className="h-[18px] w-[18px] fill-white"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-white font-bold overflow-hidden text-ellipsis whitespace-nowrap">{ 'filtrar' }</p>
              </div>
            </div>

            {
              total ?
              <>
                  <NewPaginate page={page ? page : 1} pageHandle={pageHandle} total={total} />
              </>
              : null
            }

              {/* <InfoCard title="Serviços" total={1.987} porcent={12.5}>
                <IconMenu>
                    <PasteIcon width={22} height={22} fill={`#94a3b8`}/>
                </IconMenu>
              </InfoCard>
              <InfoCard title="Em andamento" total={347} porcent={9.5}>
                <IconMenu>
                    <PasteIcon width={22} height={22} fill={`#94a3b8`}/>
                </IconMenu>
              </InfoCard>
              <InfoCard title="Finalizados" total={242} porcent={7.2}>
                <IconMenu>
                    <PasteIcon width={22} height={22} fill={`#94a3b8`}/>
                </IconMenu>
              </InfoCard> */}
          </article>

        </section>

        <section onClick={()=> setDropdown({...dropdown, status: false, technician: false})} className="flex flex-col w-full h-full overflow-hidden border-solid border-4 bg-white border-slate-100 px-1 py-1 rounded-2xl">
          {
            loading ? 
              <article className="w-full h-full flex justify-center items-center">
                <div className="flex gap-2 animate-ping">
                  <SpinnerIcon className="h-12 w-12 text-orange-500 fill-white"/>
                </div>
              </article>
            : 
              <article className="w-full overflow-auto">
              {
                    arrayOrder?.map((order:OrderType, index)=>{
                      return  (
                        <React.Fragment key={index}>
                          <OrderList 
                            layout={layout}
                            onClick={()=>{setOrderId(order.id); setNewOrderModal(true)} }
                            onDelete={()=>deleteOrder(order.id)}
                            background={index % 2 === 0 ? true : false} 
                            order={order}

                          />
                        </React.Fragment>
                      )
                    }) 
                }
              </article>
          }  

        </section>
        
        {/* {
          total && total > 1 ?
          <>
              <Paginate page={page ? page : 1} pageHandle={pageHandle} total={total} />
          </>
          : null
        } */}
        
      <NewOrderModal isOpen={newOrderModal} onClose={()=> setNewOrderModal(false)} id={orderId} orderHandle={orderHandle} />
    </Layout>
  )
}
  
export default Atendimento
  
  