import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import Api from '../../lib/api';

import Image from 'next/image'
import { OrderType } from '../types/orderType';
import internal from 'stream';

interface Props {
  order: any
  isInternal: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id, internal } = context.query
  const { host:baseUrl } = context.req.headers

  const { response } = await Api.get(`http://${baseUrl}/api/orderPdf`, {id:id})

  return { 
    props: { order: response, isInternal: Boolean(internal) },
  }
  
}

const Home: NextPage<Props> = ({order, isInternal}) => {



  return (
    order &&
      <>
          <main onClick={()=>window.print()} className="flex overflow-auto flex-col m-auto mt-5 gap-4 p-4 bg-white w-[230mm] h-[297mm] cursor-pointer" >

          <div className="w-full h-full pointer-events-none">

            <section className="px-5 py-1 flex justify-between">
            <Image src="/savassi.png" alt="Logo" width={150} height={50}/>
            <div className="">
              <p className="text-2xl text-slate-600 font-bold flex justify-center"> Ordem de serviço -<b className="text-orange-500 font-bold">{order.id}</b></p>
              <p className="text-xl text-slate-600 font-bold flex justify-center"> Prateleira - <b className="text-orange-500 font-bold">{order.shelfId ? order.shelfId : 'sem endereço'}</b></p>
              </div>
              {!isInternal ?
                <div className="w-[180px] h-[50px] text-[.6rem] text-slate-600 font-bold">
                  <p>É indispensável a apresentação deste número, ao solicitar posicionamento dos serviços.</p>
                  <hr></hr>
                  <p>Rua Paraíba, 1317, Loja 10, Savassi - Belo Horizonte/MG</p>
                  <p>contato@savassinotebooks.com</p>
                </div>
                :
                <Image src="/savassi.png" alt="Logo" width={150} height={50}/>
              }
            
            </section>

            <section className="py-2 gap-1 flex flex-col">

              <div className="grid grid-cols-2 rounded-md overflow-hidden gap-1">
                <header className="col-span-2 text-slate-600 text-lg font-bold px-2 py-1">Cliente</header>

                <div className="px-2 border-2 border-gray-500 bg-slate rounded-md">
                  <p className="text-base text-slate-600 font-bold">Nome</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.client.name ? order.client.name : 'não informado'}</p>

                </div>
                <div className="px-2 border-2 border-gray-500 bg-white rounded-md">
                  <p className="text-base text-slate-600 font-bold">Email</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.client.email ? order.client.email : 'não informado'}</p>
                </div>

                <div className="px-2 border-2 border-gray-500 bg-white rounded-md">
                  <p className="text-base text-slate-600 font-bold">Documento</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.client.document ? order.client.document : 'não informado'}</p>
                </div>
                <div className="px-2 border-2 border-gray-500 bg-white rounded-md">
                  <p className="text-base text-slate-600 font-bold">Telefone</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.client.number ? order.client.number : 'não informado'}</p>
                </div>

                <div className="col-span-2 px-2 border-2 border-gray-500 bg-white rounded-md">
                  <p className="text-base text-slate-600 font-bold">Endereço</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.client.info ? order.client.cep ?  `${order.client.cep + " - "}${order.client.info}` :  order.client.info : 'não informado'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 rounded-md overflow-hidden gap-1">
                <header className="col-span-2 text-slate-600 text-lg font-bold px-2 py-1">Equipamento</header>

                <div className="px-2 border-2 border-gray-500 bg-white rounded-md">
                  <p className="text-base text-slate-600 font-bold">Descrição</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.name ? order.name : 'não informado'}</p>
                </div>
                <div className="px-2 border-2 border-gray-500 bg-white rounded-md">
                  <p className="text-base text-slate-600 font-bold">Modelo</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.model ? order.model : 'não informado'}</p>
                </div>

                <div className="px-2 border-2 border-gray-500 bg-white rounded-md">
                  <p className="text-base text-slate-600 font-bold">Fabricante</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.brand ? order.brand : 'não informado'}</p>
                </div>
                <div className="px-2 border-2 border-gray-500 bg-white rounded-md">
                  <p className="text-base text-slate-600 font-bold">N° de Série</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.serialNumber ? order.serialNumber : 'não informado'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 rounded-md overflow-hidden gap-1 ">
                <header className="col-span-2 text-slate-600 text-lg font-bold px-2 py-1">Acessórios</header>

                <div className="py-1 px-12 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start  gap-2">
                  <input id="default-checkbox" type="checkbox" defaultChecked={order.charger}  className="w-5 h-5 text-blue-600"/>
                  <p className="text-sm text-slate-600 font-bold w-fit h-fit">Carregador</p>
                </div>
                <div className="py-1 px-12 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start  gap-2">
                  <input id="default-checkbox" type="checkbox" defaultChecked={order.battery}  className="w-5 h-5 text-blue-600"/>
                  <p className="text-sm text-slate-600 font-bold w-fit h-fit">Bateria</p>
                </div>

                <div className="py-1 px-12 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start  gap-2">
                  <input id="default-checkbox" type="checkbox" defaultChecked={order.energyCable}  className="w-5 h-5 text-blue-600"/>
                  <p className="text-sm text-slate-600 font-bold w-fit h-fit">Cabo de energia</p>
                </div>
                <div className="py-1 px-12 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start  gap-2">
                  <input id="default-checkbox" type="checkbox"  defaultChecked={order.bag}  className="w-5 h-5 text-blue-600"/>
                  <p className="text-sm text-slate-600 font-bold w-fit h-fit">Bolsa</p>
                </div>

                <div className="col-span-2 py-1 px-2 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start gap-2">
                  <p className="text-sm text-slate-600 font-bold w-fit h-fit">Outros:</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.others ? order.others : "_______________________________________________"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 rounded-md overflow-hidden gap-1">
                <header className="col-span-2 text-slate-600 text-lg font-bold px-2 py-1">Informações</header>

                <div className="col-span-2 py-1 px-2 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start gap-2">
                  <p className="text-sm text-slate-600 font-bold w-fit h-fit">Backup:</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.backup ? `Sim, ${order.backupDescription}` : "Não"}</p>
                </div>

                <div className="col-span-2 py-1 px-2 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start gap-2">
                  <p className="text-sm text-slate-600 font-bold w-fit h-fit">Relatório do cliente:</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.defectDescription ? order.defectDescription : "não informado"}</p>
                </div>

                <div className="col-span-2 py-1 px-2 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start gap-2">
                  <p className="text-sm text-slate-600 font-bold w-fit h-fit">Laudo técnico:</p>
                  <p className="text-sm text-slate-600 font-semibold">{order.technicalReport ? order.technicalReport : "não informado"}</p>
                </div>

              </div>

              <div className="grid grid-cols-10 gap-2">

                
                <div className={`flex ${isInternal ? 'col-span-4' : 'col-span-10'} ${order.services.length === 0 && !isInternal && 'h-16'} flex-col rounded-md overflow-hidden`}>
                  <header className="w-full text-slate-600  text-sm font-bold px-2 py-[.1rem]">Serviços</header>


                  <div className="w-full h-full py-1 px-2 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start gap-2">

                    <div className="flex flex-col w-full">

                      {
                        order?.services.map(({name, value}:any, key:any)=>{
                          return (
                            <p key={key} className="text-sm text-slate-600 font-semibold">
                              {name} {value ? `: R$ ${value}` : ''}
                            </p>
                          )
                        })
                      }

                    </div>
                  </div>
                  
                </div>

              
                {isInternal ? 

                  <div className="flex col-span-6 flex-col rounded-md overflow-hidden">
                    <header className="w-full text-slate-600 text-sm font-bold px-2 py-[.1rem]">Observação técnica</header>

                    <div className="w-full h-full py-1 px-2 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start gap-2">
                      <div className="h-20"></div>
                    </div>
                    
                  </div>

                : null}


              </div>
             
            </section>

            <section className="flex flex-col gap-2">
              <div className="grid grid-cols-2 rounded-md overflow-hidden ">
                <header className="col-span-2 text-slate-600 text-sm font-bold px-2 py-[.1rem]">Termo de responsabilidade de garantia</header>

                <div className="col-span-2 py-1 px-2 border-2 border-gray-500 bg-white rounded-md flex items-center justify-start gap-2">
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
                <p className="col-span-4 text-sm text-slate-600 font-semibold">S Notebooks:________________________________</p>
                <p className="col-span-4 text-sm text-slate-600 font-semibold">Cliente: ___________________________________</p>
                <p className="col-span-2 text-sm text-slate-600 font-semibold">Data:_____ /_______ /______</p>
              </div>

            </section>

          </div>

          </main>
      </>
  )
}

export default Home

