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

/* components */

interface PagConfig {
  currentPage: number;
  next: number;
  previous: number;
  total: number;
  totalPages: number;
}

const Atendimento: NextPage = () => {

  const maxLimit:number = 25

  const [newOrderModal, setNewOrderModal] = useState<boolean>(false)

  const [arrayOrder, setArrayOrder] = useState<any[]>()
 
  const [total, setTotal] = useState<number>()
  const [page, setPage] = useState<number>()

  const [search, setSearch] = useState<string>("")

  const [orderId, setOrderId] = useState<number | null>()

  const [loading, setLoading] = useState<boolean>(false)

  const getOrders = async(page:number, limit:number) => {

    setLoading(true)
    const {response} = await Api.get('/api/auth/orders', {page, limit})
    setTotal(response.totalPages)
    setPage(response.currentPage)
    setArrayOrder(response.results)
    setLoading(false)
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
      await getOrders(1, maxLimit)
    })()
  },[])

  return (
    <Layout page={'atendimento'}>
        <section>
          <article className="flex w-full justify-between py-2">

            <div onClick={() =>console.log('click')}className="flex justify-center items-center">
              <p className="text-3xl text-slate-600 font-semibold">Atendimentos</p>
            </div>

            <div className="flex gap-3">
              <div className={`flex justify-center items-center gap-2 cursor-pointer rounded-2xl p-3 duration-300 hover:scale-110 bg-slate-100 border-solid border-[.2rem] border-white`}>
                  <div  onClick={() => handleSearch()} className="w-fit h-fit">
                    <SearchIcon width={20} height={20} fill={`#94a3b8`}/>
                  </div>
                  
                  <input 
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()} 
                    onChange={(x)=> setSearch(x.target.value)} value={search}
                    type="text" className={`text-slate-500 bg-slate-100 outline-0 text-sm font-semibold duration-500 w-full`}/>

              </div>

              <div onClick={() => {setOrderId(null); setNewOrderModal(!newOrderModal)}} className={`flex justify-start items-center bg-orange-500 gap-2 p-3 cursor-pointer  rounded-2xl duration-300 hover:scale-110`}>
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
          <article className="flex w-full justify-evenly gap-4">

            {/* <div className="flex items-center justify-center">
              <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                <input type="date"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="" data-mdb-toggle="datepicker" />
              </div>
            </div> */}

            <div className="flex items-center justify-center bg-white rounded-2xl w-32 p-[9px] gap-2 cursor-pointer">
              <WrenchIcon className="h-[18px] w-[18px] fill-slate-400"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{ 'status' }</p>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white rounded-2xl w-32 p-[9px] gap-2 cursor-pointer">
              <WrenchIcon className="h-[18px] w-[18px] fill-slate-400"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{ 'técnico' }</p>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white rounded-2xl w-32 p-[9px] gap-2 cursor-pointer">
              <CalendarIcon className="h-[18px] w-[18px] fill-slate-400"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{ 'data início' }</p>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white rounded-2xl w-32 p-[9px] gap-2 cursor-pointer">
              <CalendarIcon className="h-[18px] w-[18px] fill-slate-400"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{ 'data final' }</p>
              </div>
            </div>

            <div className="flex items-center justify-center bg-orange-500 rounded-2xl w-32 p-[9px] gap-2 cursor-pointer">
              <CalendarIcon className="h-[18px] w-[18px] fill-white"/>
              <div className="flex justify-center items-center overflow-hidden">
                  <p className="text-sm text-white font-bold overflow-hidden text-ellipsis whitespace-nowrap">{ 'filtrar' }</p>
              </div>
            </div>

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

        <section className="flex flex-col w-full h-full overflow-hidden border-solid border-4 bg-white border-slate-100 px-1 py-1 rounded-2xl">
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
        
        <section>
          {
            total && total > 1 ?
              <Paginate page={page ? page : 1} pageHandle={pageHandle} total={total} />
            : null
          }
        </section>
      <NewOrderModal isOpen={newOrderModal} onClose={()=> setNewOrderModal(false)} id={orderId} orderHandle={orderHandle} />
    </Layout>
  )
}
  
export default Atendimento
  
  