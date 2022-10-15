import type { GetStaticPaths, GetServerSideProps, NextPage } from 'next'
import ArrowUpIcon from '../../components/icons/ArrowUpIcon'
import PasteIcon from '../../components/icons/PasteIcon'
import PlusIcon from '../../components/icons/PlusIcon'
import Layout from '../../components/Layout'
import InfoCard from '../../components/pages/atendimentos/InfoCard'
import OrderList from '../../components/pages/atendimentos/Orders'
import Asidebar from '../../components/sidebar/Asidebar'
import IconMenu from '../../components/sidebar/IconMenu'
import Menus from '../../components/sidebar/Menus'




const Atendimento: NextPage = (props) => {

    return (
      <Layout page={'atendimento'}>

        <section className="flex flex-col w-full gap-4">
          <article className="flex w-full justify-between">
            <div className="flex justify-center items-center">
              <p className="text-3xl text-slate-600 font-semibold">Atendimentos</p>
            </div>
            <div className="flex">
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
        <section  className="w-full h-full">
          <article className="flex flex-col gap-2">
            <OrderList  osNumber={1755} clientName={"Gabriel Henrique dsaf"} clientDocument={"15783488605"} deviceName={'MacBook 14 pro max'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1756} clientName={"Junior Augusto"} clientDocument={"15783488605"} deviceName={'Ipad 8 mini'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1757} clientName={"Julio Cesar"} clientDocument={"15783488605"} deviceName={'SmartWhat'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1758} clientName={"Romario Oliveira"} clientDocument={"15783488605"} deviceName={'Iphone 13'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1761} clientName={"Vinicius Lima"} clientDocument={"15783488605"} deviceName={'Ipad 8 mini'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1759} clientName={"Maria Vitoria"} clientDocument={"15783488605"} deviceName={'Dell 248'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1760} clientName={"Darlan Augusto"} clientDocument={"15783488605"} deviceName={'Positivo'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1762} clientName={"Marlon"} clientDocument={"15783488605"} deviceName={'Placa mãe'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1763} clientName={"Roberto Augusto"} clientDocument={"15783488605"} deviceName={'Xiaomi 7lus'} osStatus={'finalizado'}/>
            <OrderList  osNumber={1764} clientName={"Talita Fernanda"} clientDocument={"15783488605"} deviceName={'Desktop'} osStatus={'finalizado'}/>
          </article>
        </section>
        
      </Layout>
    )
  }
  
  export default Atendimento
  
  