import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'
import ContentSection from '../../components/pages/content/ContentSection'
import HeaderContent from '../../components/pages/content/HeaderSection'

const Configuracao: NextPage = () => {
  return (
    <>
      <Layout page={'configuracao'}>
        <HeaderContent title={'Configuração'}>
          <div></div>
        </HeaderContent>

        <ContentSection className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-2`}>
          <div className="col-span-1 flex">
            <div className="flex w-full h-full bg-white rounded-2xl">
            <div className="flex flex-col justify-between gap-1 bg-white w-full p-4 rounded-2xl">
                <section className="flex items-center gap-1">
                  {/* icone */}
                    <p className="text-xl text-slate-400 font-semibold ">Plateleira</p>
                </section>
                <section className="flex justify-between items-center gap-1 px-2">
                    <p className="text-3xl text-slate-600 font-semibold"><></></p>
                    <div className="flex justify-center items-center">
                        {/* <IconMenu>
                            <ArrowUpIcon width={20} height={20} fill={`rgb(34 197 94)`}/>
                        </IconMenu> */}
                        <p className="text-sm text-green-500 font-bold ">{``}</p>
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
        </ContentSection>


      </Layout>
    </>
  )
}

export default Configuracao
