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

/* components */

interface PagConfig {
  currentPage: number;
  next: number;
  previous: number;
  total: number;
  totalPages: number;
}

const Atendimento: NextPage = () => {

  const [newOrderModal, setNewOrderModal] = useState<boolean>(false)

  const [arrayOrder, setArrayOrder] = useState<any[]>()
 
  const [total, setTotal] = useState<number>()
  const [page, setPage] = useState<number>()

  // const [currentPage, setCurrentPage] = useState(1)

  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")

  const [orderId, setOrderId] = useState<number | null>()

  const [loading, setLoading] = useState<boolean>(false)

  const getOrders = async(page:number, limit:number) => {

    setLoading(true)
    const {response} = await Api.get('/api/auth/orders', {page, limit})
    console.log(response)
    setTotal(response.totalPages)
    setPage(response.currentPage)
    setArrayOrder(response.results)
    setLoading(false)
  } 

  const pageHandle = async(paramPage:number) => {
    await getOrders(paramPage, 10)
  }
  const orderHandle = async() => {
    await getOrders(page ? page : 1, 10).then(()=>setNewOrderModal(false))
  }

  const handleSearch = async() => {
    const {response} = await Api.get('/api/auth/search/orders',{content: search})
    setArrayOrder(response)
  } 

  useEffect(()=>{
    (async () => {
      await getOrders(1, 10)
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
              <div onClick={() => !searchOpen && setSearchOpen(true)} className={`flex justify-center items-center bg-orange-500 gap-2 cursor-pointer rounded-2xl p-3 duration-300 hover:scale-110  ${searchOpen ? 'bg-slate-100 border-solid border-[.2rem] border-white' : ''}`}>
                  <div  onClick={() => searchOpen && handleSearch()} className="w-fit h-fit">
                    <SearchIcon width={20} height={20} fill={`${searchOpen ? '#94a3b8' : 'white'}`}/>
                  </div>
                  
                  <input 
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()} 
                    onChange={(x)=> setSearch(x.target.value)} value={search}
                    type="text" className={`text-slate-500 bg-slate-100 outline-0 text-sm font-semibold duration-500 ${searchOpen ? 'w-full' : 'hidden'}`}/>

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
          
          <article className="flex w-full gap-4">
              <InfoCard title="Serviços" total={1.987} porcent={12.5}>
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
              </InfoCard>
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
                    arrayOrder?.map(({id,name, client, status}:any, index)=>{
                      return  (
                        <React.Fragment key={index}>
                          <OrderList 

                            onClick={()=>{setOrderId(id); setNewOrderModal(true)} }
                            background={index % 2 === 0 ? true : false} 
                            osNumber={id}
                            clientName={client.name}  
                            clientDocument={client.document} 
                            deviceName={name ? name : 'não informado'}  
                            osStatus={status ? status : 'aberto'}

                          />
                        </React.Fragment>
                      )
                    }) 
                }
              </article>
          }  

        </section>
        
        <section>
            <Paginate page={page ? page : 1} pageHandle={pageHandle} total={total ? total : 1} />
        </section>
      <NewOrderModal isOpen={newOrderModal} onClose={()=> setNewOrderModal(false)} id={orderId} orderHandle={orderHandle} />
    </Layout>
  )
}
  
export default Atendimento
  
  