import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import PlusIcon from '../../../components/icons/PlusIcon'
import WrenchIcon from '../../../components/icons/WrenchIcon'
import { UserType } from '../../../types/userType'
import Api from '../../../../lib/api'
import SortIcon from '../../../components/icons/SortIcon'
import DropDown from '../../../components/elements/DropDown'
import { Shelf } from '../../../types/shelf'
import ShelfItem from '../../../components/pages/configuracao/ShelfItem'
import ShelfModal from '../../../components/modals/ShelfModal'
import AtendimentoIcon from '../../../components/icons/AtendimentoIcon'
import ShelfIcon from '../../../components/icons/ShelfIcon'
import SpinnerIcon from '../../../components/icons/SpinnerIcon'
import ShelfRange from '../../../components/pages/configuracao/ShelfRange'



const Prateleiras: NextPage = () => {



  const [ dropdown, setDropdown ] = useState<any>()
  const [ loadShelf, setLoadShelf ] = useState(false)

  const [ searchFilter, setSearchFilter ] = useState<any>({})

  const [ userArray, setUserArray ] = useState<UserType[]>([])
  const [ shelfArray, setShelfArray ] = useState<Shelf[]>([])

  const [ shelfModal, setShelfModal ] = useState(false)
  const [ selectedShelf, setSelectedShelf ] = useState<Shelf | undefined>(undefined)

  function openShelfModal(shelf?: Shelf) {

    setSelectedShelf(shelf)

    setShelfModal(true)

  }

  const getUsers = async() => {

    try {
      
      const {response:users} = await Api.get('/api/auth/users')
  
      setUserArray(users)

    } catch (error) {
      
    } finally {

    }

  }

  async function getShelf(type?: string) {

    try {
      
      setLoadShelf(true)

      const { shelf, message } = await Api.get('/api/auth/shelf', {...searchFilter, type: type || ''})

      setSearchFilter((prev: any)=> ({...prev, type: type || '' }));
  
      if(!shelf.length) return
  
      setShelfArray(shelf)
  
      
    } catch (error) {

      console.log(error)
      
    } finally {

      setLoadShelf(false)

    }


  }


  useEffect(()=>{

    getUsers()
    getShelf()

  },[])

  return (
    <>
      <Layout page={'configuracao'}>
        <section>
          <article className="flex w-full justify-between py-2">

            <div className="flex justify-center items-center">
              <p className="text-3xl text-slate-600 font-semibold">Prateleiras</p>
            </div>

            <div className="flex gap-3">
              <div onClick={() => openShelfModal()} className={`flex justify-start items-center bg-orange-500 gap-2 p-3 cursor-pointer  rounded-xl duration-150 hover:scale-105`}>
                      <PlusIcon width={22} height={22} fill={`white`}/>
                  <p className={`text-white text-sm font-semibold`}>
                      Nova prateleira
                  </p>
              </div>
            </div>


            
          </article>
        </section>
          
        <section className="">
          
          <article className="flex w-full justify-start gap-4">

            <div className="flex relative items-center justify-center bg-slate-100 rounded-2xl w-fit p-1 px-3 gap-2 border-solid border-[.2rem] border-white duration-150 group cursor-pointer">
              <WrenchIcon className="h-[18px] w-[18px] fill-slate-400 group-hover:fill-orange-500 duration-150"/>
              <div onClick={()=> setDropdown({...dropdown, technician: true})} className="flex justify-center items-center overflow-hidden">
                <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  {
                    searchFilter.userId ?
                      userArray?.map(({id, name})=>{return Number(searchFilter.userId) === id ? name : null})
                    : 'Técnico'
                  }
                </p>
              </div>
              <DropDown.card isOpen={dropdown?.technician} close={()=> {setDropdown({...dropdown, technician: false}); console.log(dropdown)}} className="left-[-.4rem] top-10 w-36">
                {
                  userArray ? 
                    userArray.filter(({role})=> role <= 200).map(({id, name, role})=>{
                        return <DropDown.item key={id} onClick={()=>{setDropdown({...dropdown, technician: false}); setSearchFilter((prev: any)=> ({...prev, userId: id}))}} value={name}/>
                    })
                  : null
                }
              </DropDown.card>
            </div>

            <div className="flex relative items-center justify-center bg-slate-100 rounded-2xl w-fit p-1 px-3 gap-2 border-solid border-[.2rem] border-white duration-150 group cursor-pointer">
              <ShelfIcon className="h-[18px] w-[18px] fill-slate-400 group-hover:fill-orange-500 duration-150"/>
              <div onClick={()=> setDropdown({...dropdown, status: true})} className="flex justify-center items-center overflow-hidden">
                <p className="text-sm text-slate-500 font-bold overflow-hidden text-ellipsis whitespace-nowrap">{searchFilter.stype || 'Tipo'}</p>
              </div>
              <DropDown.card isOpen={dropdown?.status} close={()=> {setDropdown({...dropdown, status: false}); console.log(dropdown)}} className="top-10 w-36">
                <DropDown.item onClick={()=>{setDropdown({...dropdown, status: false}); getShelf('')}} value={'Todas'}/>
                <DropDown.item onClick={()=>{setDropdown({...dropdown, status: false}); getShelf('manutencao')}} value={'Manutenção'}/>
                <DropDown.item onClick={()=>{setDropdown({...dropdown, status: false}); getShelf('recepcao')}} value={'Recepção'}/>
              </DropDown.card>
            </div>

          </article>

        </section>

        <section className="flex p-2 w-full h-full overflow-scroll bg-slate-100 border-solid border-[.2rem] border-white rounded-2xl">

          <div className={`flex w-full h-full justify-center items-center ${loadShelf ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <span className="animate-ping">
                <SpinnerIcon className="h-12 w-12 animate-ping text-orange-500 fill-white"/>
            </span>
          </div>  

          <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full h-fit ${!loadShelf ? 'opacity-100' : 'opacity-0 hidden'}`}>

            <ShelfRange onUpdate={()=> getShelf()}/>

            {
              shelfArray.length ? 
                shelfArray.map((shelf, i)=> <ShelfItem onClick={()=> openShelfModal(shelf)} key={i} shelf={shelf} />)
              : null
            }

          </div>

        </section>
          
        <ShelfModal isOpen={shelfModal} onClose={()=> setShelfModal(false)} onSave={data => { setShelfModal(false); getShelf() }} shelf={selectedShelf}/>
      </Layout>
    </>
  )
}

export default Prateleiras
