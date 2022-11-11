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
   
    const {response} = await Api.get('/api/auth/orders', {page, limit})

    setTotal(response.totalPages)
    setPage(response.currentPage)
    setArrayOrder(response.results)
    console.log('current page: ', page)
  } 

  const pageHandle = async(paramPage:number) => {
    await getOrders(paramPage, 10)
  }

  useEffect(()=>{
    (async () => {
      await getOrders(1, 10)
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
            <div className={`flex justify-start items-center bg-orange-500 gap-2 cursor-pointer h-12 rounded-2xl px-3 duration-300 hover:scale-110`}>
                <IconMenu>
                    <PlusIcon width={22} height={22} fill={`white`}/>
                </IconMenu>
                <p className={`text-white text-sm font-semibold duration-300`}>
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
        <div className="w-full h-full overflow-auto py-1 border-solid border-4 bg-white border-slate-100 px-1 rounded-2xl">
          <article className="flex flex-col gap-2 ">
            {
                arrayOrder?.map(({id,name, client, status}:any, index)=>{
                  return  (
                    <React.Fragment key={index}>
                      <OrderList background={index % 2 === 0 ? false : true} onClick={()=>console.log('atendimento', id)} osNumber={id}  clientName={client.name}  clientDocument={client.document} deviceName={name ? name : 'não informado'}  osStatus={status ? status : 'aberto'}/>
                    </React.Fragment>
                  )
                }) 
            }
          </article>
        </div>
      </section>
      <section>
          <Paginate page={page ? page : 1} pageHandle={pageHandle} total={total ? total : 1} />
      </section>
      <NewOrderModal isOpen={newOrderModal} onClose={()=> setNewOrderModal(false)} />
    </Layout>
  )
}
  
export default Atendimento
  
  