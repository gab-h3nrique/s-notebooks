import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import Api from '../../lib/api';

import Image from 'next/image'

interface Props {
  content: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const { host:baseUrl } = context.req.headers

  const {response} = await Api.get(`http://${baseUrl}/api/orderPdf`, {id:id})

  return { 
    props: { content: response }
  }
  
}

const Home: NextPage<Props> = ({content}) => {

  const [order, setOrder] = useState<any>();

  useEffect(()=>{
    (async () => {
      setOrder(content)
      console.log(content)
      console.log(order?.shelfId ? order.shelfId : 'nada')
    })()
  },[])

return (
  order &&
    <>
        <main className="flex overflow-auto flex-col gap-4 p-4 bg-white w-[210mm] h-[297mm]" >

        <div className="w-full h-full">

          <section className="px-5 py-2 flex justify-between">
          <Image src="/savassi.png" alt="Logo" width={150} height={50}/>
          <div className="">
            <p className="text-2xl text-slate-600 font-semibold flex justify-center"> Ordem de serviço - {order.id}</p>
            <p className="text-sm text-slate-600 font-semibold flex justify-center"> Prateleira - {order.shelfId}</p>
            </div>
          <Image src="/savassi.png" alt="Logo" width={150} height={50}/>
          </section>

          <section className="py-2 gap-2 flex flex-col">

            <div className="grid grid-cols-2 rounded-md overflow-hidden bg-gray-500">
              <header className="col-span-2 text-white text-lg font-semibold px-2 py-1">Cliente</header>

              <div className="px-2 border-4 border-r-2 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Nome</p>
                <p className="text-sm text-slate-600 font-semibold">{order.client.name}</p>
              </div>
              <div className="px-2 border-4 border-l-2 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Email</p>
                <p className="text-sm text-slate-600 font-semibold">{order.client.email}</p>
              </div>

              <div className="px-2 border-4 border-r-2 border-t-0 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Documento</p>
                <p className="text-sm text-slate-600 font-semibold">{order.client.document}</p>
              </div>
              <div className="px-2 border-4 border-l-2 border-gray-500 border-t-0 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Telefone</p>
                <p className="text-sm text-slate-600 font-semibold">{order.client.number}</p>
              </div>

              <div className="col-span-2 px-2 border-4 border-t-0 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Endereço</p>
                <p className="text-sm text-slate-600 font-semibold">{order.client.info}</p>
              </div>
            </div>




            <div className="grid grid-cols-2 rounded-md overflow-hidden bg-gray-500">
              <header className="col-span-2 text-white text-lg font-semibold px-2 py-1">Equipamento</header>

              <div className="px-2 border-4 border-r-2 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Descrição</p>
                <p className="text-sm text-slate-600 font-semibold">{order.name}</p>
              </div>
              <div className="px-2 border-4 border-l-2 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Modelo</p>
                <p className="text-sm text-slate-600 font-semibold">{order.model}</p>
              </div>

              <div className="px-2 border-4 border-r-2 border-t-0 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Fabricante</p>
                <p className="text-sm text-slate-600 font-semibold">{order.brand}</p>
              </div>
              <div className="px-2 border-4 border-l-2 border-gray-500 border-t-0 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">N° de Série</p>
                <p className="text-sm text-slate-600 font-semibold">{order.serialNumber}</p>
              </div>
            </div>




            <div className="grid grid-cols-2 rounded-md overflow-hidden bg-gray-500">
              <header className="col-span-2 text-white text-lg font-semibold px-2 py-1">Equipamento</header>

              <div className="px-2 border-4 border-r-2 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Descrição</p>
                <p className="text-sm text-slate-600 font-semibold">{order.name}</p>
              </div>
              <div className="px-2 border-4 border-l-2 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Modelo</p>
                <p className="text-sm text-slate-600 font-semibold">{order.model}</p>
              </div>

              <div className="px-2 border-4 border-r-2 border-t-0 border-gray-500 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">Fabricante</p>
                <p className="text-sm text-slate-600 font-semibold">{order.brand}</p>
              </div>
              <div className="px-2 border-4 border-l-2 border-gray-500 border-t-0 bg-white rounded-md">
                <p className="text-base text-slate-600 font-bold">N° de Série</p>
                <p className="text-sm text-slate-600 font-semibold">{order.serialNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 rounded-md overflow-hidden bg-gray-500">
              <header className="col-span-2 text-white text-lg font-semibold px-2 py-1">Acessórios</header>

              <div className="py-1 px-12 border-4 border-r-2 border-gray-500 bg-white rounded-md flex items-center justify-start  gap-2">
                <input id="default-checkbox" type="checkbox" defaultChecked={order.charger}  className="w-5 h-5 text-blue-600"/>
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Carregador</p>
              </div>
              <div className="py-1 px-12 border-4 border-l-2 border-gray-500 bg-white rounded-md flex items-center justify-start  gap-2">
                <input id="default-checkbox" type="checkbox" defaultChecked={order.battery}  className="w-5 h-5 text-blue-600"/>
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Bateria</p>
              </div>

              <div className="py-1 px-12 border-4 border-r-2 border-t-0 border-gray-500 bg-white rounded-md flex items-center justify-start  gap-2">
                <input id="default-checkbox" type="checkbox" defaultChecked={order.energyCable}  className="w-5 h-5 text-blue-600"/>
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Cabo de energia</p>
              </div>
              <div className="py-1 px-12 border-4 border-l-2 border-gray-500 border-t-0 bg-white rounded-md flex items-center justify-start  gap-2">
                <input id="default-checkbox" type="checkbox"  defaultChecked={order.bag}  className="w-5 h-5 text-blue-600"/>
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Bolsa</p>
              </div>

              <div className="col-span-2 py-1 px-2 border-4 border-gray-500 border-t-0 bg-white rounded-md flex items-center justify-start gap-2">
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Outros:</p>
                <p className="text-sm text-slate-600 font-semibold">{order.others ? order.others : "_______________________________________________"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 rounded-md overflow-hidden bg-gray-500">
              <header className="col-span-2 text-white text-lg font-semibold px-2 py-1">Informações</header>

              <div className="col-span-2 py-1 px-2 border-4 border-gray-500 border-t-0 bg-white rounded-md flex items-center justify-start gap-2">
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Backup</p>
                <p className="text-sm text-slate-600 font-semibold">{order.backup ? `Sim, ${order.backupDescription}` : "Não"}</p>
              </div>

              <div className="col-span-2 py-1 px-2 border-4 border-gray-500 border-t-0 bg-white rounded-md flex items-center justify-start gap-2">
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Relatório do cliente:</p>
                <p className="text-sm text-slate-600 font-semibold">{order.defectDescription ? order.defectDescription : "não informado!"}</p>
              </div>

              <div className="col-span-2 py-1 px-2 border-4 border-gray-500 border-t-0 bg-white rounded-md flex items-center justify-start gap-2">
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Laudo técnico:</p>
                <p className="text-sm text-slate-600 font-semibold">{order.technicalReport ? order.technicalReport : "não informado!"}</p>
              </div>

              <div className="col-span-2 py-1 px-2 border-4 border-gray-500 border-t-0 bg-white rounded-md flex items-center justify-start gap-2">
                <p className="text-sm text-slate-600 font-bold w-fit h-fit">Serviço:</p>
                <p className="text-sm text-slate-600 font-semibold">{order.generalDescription ? order.generalDescription : "não informado!"}</p>
              </div>
            </div>



          </section>

          <section className="flex flex-col gap-2">
            <div className="grid grid-cols-2 rounded-md overflow-hidden bg-gray-500">
              <header className="col-span-2 text-white text-sm font-semibold px-2 py-[.1rem]">Termo de responsabilidade de garantia</header>

              <div className="col-span-2 py-1 px-2 border-4 border-gray-500 border-t-0 bg-white rounded-md flex items-center justify-start gap-2">
                <p className="text-[.6rem] text-slate-600 font-semibold">

                  Prazo previsto para retorno de 10 dias úteis, se necessário e previamente comunicado ao cliente este prazo poderá ser estendido.
                  Para retirada dos equipamentos é necessário a integral quitação dos débitos, aviso prévio de 24hs e apresentação deste documento com posse de RG.
                  O clienteé responsável pela legalidade e procedência dos equipamentos, cabendo ao mesmo a posse da nota fiscal ou comprovante de origem.
                  Todos os equipamentos são testados e conferidos na entrada e saída de nossa empresa e o cliente assina sob sua responsabilidade concordando com as informações relatadas na OS.
                  Não aceitamos reclamações posteriores. Referindo a equipamentos abertos anteriores, não nos responsabilizamos por danos ou ausência de peças. 
                  Equipamentos abandonados na empresa por mais de 6 meses serão sucateados para cobertura de despesas a favor da Savassi Notebooks.
                  A Savassi Notebooks não comercializa licenças ou softwares, cabendo ao cliente o registro e legaização dos mesmos. Não nos responsabilizamos pela perda de dados e softwares mesmo quando solicitado a cópia (backup).

                </p>
              </div>
              
            </div>

            <div className="grid grid-cols-3 gap-2">
              <p className="col-span-10 text-sm text-slate-600 font-bold">Assinaturas</p>
              <p className="col-span-4 text-sm text-slate-600 font-semibold">S Notebooks:_____________________________________</p>
              <p className="col-span-4 text-sm text-slate-600 font-semibold">Cliente: ________________________________________</p>
              <p className="col-span-2 text-sm text-slate-600 font-semibold">Data:_____ /_______ /______</p>
            </div>

          </section>

          

          
        </div>

        </main>
    </>
)
}

export default Home

