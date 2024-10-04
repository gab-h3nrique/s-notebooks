import type { NextPage } from 'next'
import Layout from '../../../../components/Layout'
import { userContext } from '../../../../context/UserContext'
import { useEffect, useState } from 'react'
import Api from '../../../../../lib/api'
import { useNotification } from '../../../../context/NotificationContext'
import { EMPTY_USER, UserType } from '../../../../types/userType'
import CircleCheckIcon from '../../../../components/icons/CircleCheckIcon'
import CircleIcon from '../../../../components/icons/CircleIcon'
import CloseIcon from '../../../../components/icons/CloseIcon'
import CheckIcon from '../../../../components/icons/CheckIcon'
import SpinnerIcon from '../../../../components/icons/SpinnerIcon'
import DropDown from '../../../../components/elements/DropDown'
import Router from 'next/router'



const Prateleiras: NextPage = () => {

  const { user } = userContext()

  const [ loading, setLoading ] = useState(false)

  const [ deleteLoading, setDeleteLoading ] = useState(false)

  const [ password, setPassword ] = useState('')

  const [ changePassword, setChangePassword ] = useState(false)

  const [ dropdown, setDropdown ] = useState(false)

  const notification = useNotification()

  const [ userPage, setUserPage ] = useState<UserType>(EMPTY_USER)

  function verifyPermission() {

    if(!user) return false

    if(user.role <= 100) return true

    false

  }

  const getUser = async() => {

    try {

      setLoading(true)

      const id = window.location.pathname.replace('/app/configuracao/usuarios/', '')

      if(id == 'new') return 
      
      const { response } = await Api.get('/api/auth/users', { id: id })

      if(!response || !response.id) return
  
      setUserPage(response)

    } catch (error: any) {

      // notification.push({ type: 'success', title: 'Sucesso!', description: `OS salva na prateleira: ${response?.shelfId}`, time: 4000 })
      console.log('error: ', error.message)
      
    } finally {

      setLoading(false)

    }

  }

  async function remove() {

    try {

      if(!userPage || !userPage.id) return

      setLoading(true)

      const formatedUser = {

        ...userPage,
        deleted: true

      }

      const { data } = await Api.post('/api/auth/users', { user: formatedUser })

      if(!data) return notification.push({ type: 'error', title: 'Atenção!', description: 'Falha ao salvar os dados.' })

      notification.push({ type: 'success', title: 'Sucesso!', description: 'Os dados foram salvos com sucesso!', time: 2000 })

      window.location.reload()
      window.location.href = `/app/configuracao/usuarios`
      
    } catch (error: any) {

      console.log('error: ', error.message)
      
    } finally {

      setLoading(false)

    }

  }
  async function save() {

    try {

      setLoading(true)

      const { data } = await Api.post('/api/auth/users', { user: userPage, newPassword: password ? password : undefined })

      if(!data) return notification.push({ type: 'error', title: 'Atenção!', description: 'Falha ao salvar os dados.' })

      notification.push({ type: 'success', title: 'Sucesso!', description: 'Os dados foram salvos com sucesso!', time: 2000 })

      window.location.href = `/app/configuracao/usuarios`

    } catch (error: any) {

      console.log('error: ', error.message)
      
    } finally {

      setLoading(false)

    }

  }


  useEffect(()=>{

    if(typeof window !== "undefined") {

      getUser()

    }

  },[])

  return (
    <>
      <Layout page={'configuracao'}>
        <section>
          <article className="flex w-full justify-between py-2">

            <div className="flex justify-center items-center">
              <p className="text-3xl text-slate-600 font-semibold">Usuário</p>
            </div>
            
          </article>
        </section>
          
        <section className="grid p-2 gap-2 grid-cols-3">
          
          <div className="col-span-3 relative">

            <label className="block text-sm mb-1 font-medium text-slate-500">Nome</label>
            <div className={`flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150`}>
                <input onChange={(event)=> setUserPage(prev =>({...prev, name: event.target.value})) } type="text" className={`bg-gray-50 h-full w-full outline-0 overflow-hidden text-ellipsis whitespace-nowrap cursor-auto`} placeholder="..." value={userPage.name}/>
            </div>
            
          </div>
          <div className="col-span-3 relative">

            <label className="block text-sm mb-1 font-medium text-slate-500">Email</label>
            <div className={`flex gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150`}>
                <input onChange={(event)=> setUserPage(prev =>({...prev, email: event.target.value})) } type="text" className={`bg-gray-50 h-full w-full outline-0 overflow-hidden text-ellipsis whitespace-nowrap cursor-auto`} placeholder="..." value={userPage.email}/>
            </div>

          </div>
          <div className="col-span-3 relative">

            <label className="block text-sm mb-1 font-medium text-slate-500">Senha</label>

            <div onClick={() => setChangePassword(true)} className={`${ changePassword ? 'hidden' : 'flex' } w-fit h-fit flex justify-start items-center bg-orange-500 p-2 cursor-pointer  rounded-xl duration-150 hover:scale-105`}>
              <p className={`text-white text-sm font-semibold`}>
                Alterar senha
              </p>
            </div>

            <div className={`${ !changePassword ? 'hidden' : 'flex' } gap-1 col-span-4 text-sm font-medium text-slate-600 rounded-lg w-full bg-gray-50 px-3 py-1 border-2 border-gray-300 outline-none hover:border-transparent hover:ring hover:ring-orange-400 hover:scale-y-105 duration-150`}>
              <input onChange={(event)=> setPassword(event.target.value) } type="text" className={`bg-gray-50 h-full w-full outline-0 overflow-hidden text-ellipsis whitespace-nowrap cursor-auto`} placeholder="..." value={password}/>
            </div>

          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-slate-500">Cargo</label>
            <article className="flex justify-between gap-2">
              <div onClick={()=> setUserPage(prev => ({...prev, role: 100}))} className={`flex items-center ${userPage.role == 100 ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                  {userPage.role == 100 ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                          : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                  <label  className={`text-sm ${userPage.role == 100 ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Administrador</label>
              </div>

              <div onClick={()=> setUserPage(prev => ({...prev, role: 200}))} className={`flex items-center ${userPage.role == 200 ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                  {userPage.role == 200 ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                          : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                  <label  className={`text-sm ${userPage.role == 200 ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Técnico</label>
              </div>

              <div onClick={()=> setUserPage(prev => ({...prev, role: 300}))} className={`flex items-center ${userPage.role == 300 ? 'bg-orange-100' : 'bg-slate-100' } gap-1 px-1 py-2  rounded-lg w-full hover:scale-110 duration-100 cursor-pointer `}>
                  {userPage.role == 300 ? <CircleCheckIcon  width={20} height={20} fill={`#F06531`} />
                          : <CircleIcon  width={20} height={20} fill={`#94a3b8`} />}
                  <label  className={`text-sm ${userPage.role == 300 ? 'text-orange-500' : 'text-slate-400' } font-semibold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}>Atendente</label>
              </div>

            </article>
          </div>
          <div className='w-full flex col-span-3 gap-3 mt-3 relative'>

            <DropDown.card isOpen={dropdown} close={()=>setDropdown(false)} className="bottom-14 left-5 w-fit">
                <DropDown.item onClick={()=>{setDropdown(false); remove()}} value={'Confirmar'}/>
                <DropDown.item onClick={()=>setDropdown(false)} value={'Cancelar'}/>
            </DropDown.card>

            <div onClick={() => setDropdown(true)} className={`flex justify-center items-center bg-slate-400 hover:bg-red-500 gap-2 p-2 px-4 cursor-pointer w-1/4 rounded-xl duration-150 hover:scale-y-110`}>
              {!deleteLoading ? 
                  <CloseIcon  className="h-[22px] w-[22px] fill-white"/> : 
                  <SpinnerIcon className="h-5 w-5 text-slate-300 fill-white"/>
              } 
              <p className={`text-white text-sm font-semibold duration-500`}>
                {!deleteLoading ? 'Excluir' : 'Excluindo...'}
              </p>
            </div>
            <div onClick={save} className={`flex justify-center items-center bg-orange-500 gap-2 p-2 px-4 w-full cursor-pointer rounded-xl duration-150 hover:scale-y-110`}>
                {!loading ? 
                    <CheckIcon width={22} height={22} className="fill-white"/> : 
                    <SpinnerIcon className="h-5 w-5 text-orange-300 fill-white"/>
                } 
                <p className={`text-white text-sm font-semibold duration-500`}>
                    {!loading ? 'Salvar' : 'Salvando...'}
                </p>
            </div>
          </div>


        </section>
      </Layout>
    </>
  )
}

export default Prateleiras
