import type { GetStaticPaths, GetServerSideProps, NextPage } from 'next'
/* hooks */
import { useEffect, useState } from 'react'
import { getApi } from '../../../lib/api'

/* components */
import ArrowUpIcon from '../../components/icons/ArrowUpIcon'
import PasteIcon from '../../components/icons/PasteIcon'
import PlusIcon from '../../components/icons/PlusIcon'
import Layout from '../../components/Layout'
import NewOrderModal from '../../components/modals/NewOrderModal'
import InfoCard from '../../components/pages/atendimentos/InfoCard'
import OrderList from '../../components/pages/atendimentos/Orders'
import Asidebar from '../../components/sidebar/Asidebar'
import IconMenu from '../../components/sidebar/IconMenu'
import Menus from '../../components/sidebar/Menus'

/* components */



const Atendimento: NextPage = () => {

  const [newOrderModal, setNewOrderModal] = useState<boolean>(false)

  const [arrayOrder, setArrayOrder] = useState<any[]>()
 
  const getOrders = async(page:number, limit:number) => {
   
    const {response:orders} = await getApi('/api/auth/orders', {page, limit})
    console.log(orders)
    setArrayOrder(orders.results)

  } 

  useEffect(()=>{
    (async () => {
      await getOrders(1, 20)
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
      <section className="w-full h-full overflow-hidden pb-[5rem]">
        <div className="w-full h-full overflow-auto py-1 border-solid border-4 border-slate-100 px-1 rounded-2xl">

          <article className="flex flex-col gap-2 ">
            {
              arrayOrder ? 
                arrayOrder.map(({id,name, client, status}:any)=>{
                  return  <OrderList onClick={()=>console.log('atendimento', id)} osNumber={id}  clientName={client.name}  clientDocument={client.document} deviceName={name ? name : 'não informado'}  osStatus={status ? status : 'aberto'}/>
                }) 
              : null
            }
          </article>
          {/* <div className="flex justify-center items-center p-2 h-20 w-96">
            
          </div> */}
        </div>

        <article className="relative bottom-[-0.5rem] flex justify-center items-center p-2 h-16 w-full pointer-events-none">
          <div className=" bg-white drop-shadow-md shadow-slate-100 h-[3.6rem] w-[30rem] rounded-full pointer-events-auto">

          </div>
        </article>
      </section>
      <NewOrderModal isOpen={newOrderModal} onClose={()=> setNewOrderModal(false)} />
    </Layout>
  )
}
  
export default Atendimento
  
  