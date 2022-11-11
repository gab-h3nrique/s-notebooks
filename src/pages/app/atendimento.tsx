import type { GetStaticPaths, GetServerSideProps, NextPage } from 'next'
/* hooks */
import React, { useEffect, useState } from 'react'
import { getApi } from '../../../lib/api'
import AngleUpIcon from '../../components/icons/AngleUpIcon'

/* components */
import ArrowUpIcon from '../../components/icons/ArrowUpIcon'
import PasteIcon from '../../components/icons/PasteIcon'
import PlusIcon from '../../components/icons/PlusIcon'
import Layout from '../../components/Layout'
import NewOrderModal from '../../components/modals/NewOrderModal'
import InfoCard from '../../components/pages/atendimentos/InfoCard'
import OrderList from '../../components/pages/atendimentos/Orders'
import Paginate from '../../components/pages/Paginate'
import Asidebar from '../../components/sidebar/Asidebar'
import IconMenu from '../../components/sidebar/IconMenu'
import Menus from '../../components/sidebar/Menus'

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

  const [currentPage, setCurrentPage] = useState(1)

  const getOrders = async(page:number, limit:number) => {
   
    const {response} = await getApi('/api/auth/orders', {page, limit})

    console.log(response)
    // const object :any = {currentPage:response.currentPage, next:response.next, previous:response.previus, total:response.total, totalPages:response.totalPages}
    setTotal(response.totalPages)
    setPage(response.currentPage)
    setArrayOrder(response.results)

  } 

  useEffect(()=>{
    (async () => {
      await getOrders(1, 5)
    })()
  },[])

  return (
    <Layout page={'atendimento'}>

      <section className="flex flex-col w-full gap-4">
        <article className="flex w-full justify-between">
          <div onClick={() =>console.log('click')}className="flex justify-center items-center">
            <p className="text-3xl text-slate-600 font-semibold">Atendimentos</p>
          </div>
          <div onClick={() => setNewOrderModal(true)} className="flex">
            <div className={`flex justify-start items-center bg-orange-500 gap-2 cursor-pointer h-12 rounded-2xl px-3 duration-500 hover:scale-110`}>
                <IconMenu>
                    <PlusIcon width={22} height={22} fill={`white`}/>
                </IconMenu>
                <p className={`text-white text-sm font-semibold duration-500`}>
                    Novo atendimento
                </p>
            </div>
          </div>
        </article>
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
      <section className="w-full h-full overflow-hidden">
        <div className="w-full h-full overflow-auto py-1 border-solid border-4 border-slate-100 px-1 rounded-2xl">

          <article className="flex flex-col gap-2 ">
            {
                arrayOrder?.map(({id,name, client, status}:any, index)=>{
                  return  (
                    <React.Fragment key={index}>
                      <OrderList onClick={()=>console.log('atendimento', id)} osNumber={id}  clientName={client.name}  clientDocument={client.document} deviceName={name ? name : 'não informado'}  osStatus={status ? status : 'aberto'}/>
                    </React.Fragment>
                  )
                }) 
            }
          </article>
          {/* <div className="flex justify-center items-center p-2 h-20 w-96">
            
          </div> */}
        </div>

        
      </section>
      <section>
        {/* {
          arrayOrder ? 
          <Paginate value={{arrayOrder, setArrayOrder, paginateConfig, setPaginateConfig}} />
          : null
        } */}
        <article className="flex justify-center items-centerw-full ">
            <section className=" bg-white w-full rounded-2xl flex items-center p-3 justify-between">
                <div className="flex bg-orange-500 rounded-2xl p-3 gap-1 items-center hover:scale-110 duration-200 cursor-pointer">
                    <AngleUpIcon transform={'rotate(270)'} width={22} height={22} fill={`white`}/>
                    <p className={`text-white text-base font-semibold duration-500`}>Página anterior</p>
                </div>
                <div className="flex gap-2">

                  {
                    total && page ? 
                      Array.from(Array(total)).map((e, index) => {
                        if(index+1 > page - 4 && index+1 < page + 4) {
                          return (
                              <div onClick={()=>setPage(index+1)} key={index} className={`flex ${(index+1) === page ? 'bg-orange-500' : 'bg-slate-300'} items-center justify-center rounded-2xl py-[.6rem] px-[1.1rem] gap-1 hover:scale-110 duration-200 cursor-pointer`}>
                                  <p className={`text-white text-2xl font-bold duration-500`}>{index+1}</p>
                              </div>
                          )
                        }
                        
                      })
                      : null
                  }
                </div>
                

              <div className="flex bg-orange-500 rounded-2xl p-3 gap-1 items-center  hover:scale-110 duration-200 cursor-pointer">
                  <p className={`text-white text-base font-semibold duration-500`}>Página seguinte</p>
                  <AngleUpIcon transform={'rotate(90)'} width={22} height={22} fill={`white`}/>
              </div>
            </section>
        </article>
        
      </section>
      <NewOrderModal isOpen={newOrderModal} onClose={()=> setNewOrderModal(false)} />
    </Layout>
  )
}
  
export default Atendimento
  
  