import { useEffect, useState } from "react";
import Snotebooks from "./icons/Snotebooks";
import SpinnerIcon from "./icons/SpinnerIcon";



const Login = ( props: any ) =>{
    const {setEmail, setPassword, message, button, loading, login} = props.user;

    const handleEmail = (e:any) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e:any) => {
        setPassword(e.target.value)
    }

    useEffect(()=>{

    },[loading])

    return (

    <main className="w-screen h-screen grid grid-cols-2 border-t-[3px] border-orange-600">

        <section className="col-span-2 lg:col-span-1 h-full">

            <article className="flex h-full w-full justify-center items-center">

                <div className="flex flex-col w-full p-5 justify-center items-center gap-5">

                <div className="bg-orange-600 opacity-80 p-6 rounded-2xl shadow-lg shadow-slate-500/50 hover:scale-105 duration-200 cursor-pointer">
                    <Snotebooks width={80} height={80} fill={'white'} />
                </div>
                
                <p className="text-3xl text-gray-500 font-semibold py-6">Fazer Login no S-notebooks</p>

                <div className="w-full flex flex-col gap-3 max-w-xl py-2">
                    <label className="text-xl font-medium text-gray-400">Email</label>
                    <input onChange={(e)=>{handleEmail(e)}} type="email" className="text-xl font-medium text-slate-600 rounded-xl w-full bg-gray-50 p-4 border-2 border-white outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Digite seu email" />
                </div>

                <div className="w-full flex flex-col gap-3 max-w-xl py-2">
                    <label className="text-xl font-medium text-gray-400">Senha</label>
                    <input onChange={(e)=>{handlePassword(e)}} type="password"  onKeyPress={(e) => e.key === 'Enter' &&  button && login()} className="text-xl font-medium text-slate-600 rounded-xl w-full bg-gray-50 p-4 border-2 border-white outline-none focus:border-transparent focus:ring focus:ring-orange-400 hover:scale-y-105 duration-150" placeholder="Digite sua senha" />
                </div>

                <div className="w-full flex flex-col items-center gap-3 max-w-xl py-2">
                    { message && <span className="text-red-600/75  text-center font-bold w-fit">{message}</span>}
                    <button disabled={!button} onClick={()=>login()} className="flex justify-center items-center gap-2 text-xl font-bold text-white rounded-xl w-full bg-orange-600 p-4 opacity-80 hover:opacity-100 hover:scale-105 hover:animate-none duration-200 animate-pulse cursor-pointer">

                        {loading && <SpinnerIcon className="h-5 w-5 text-orange-300 fill-white"/> } 
                        <p className={`duration-500`}>
                            {!loading ? 'Entrar' : 'Carregando . . .'}
                        </p>


                    </button>
                </div>


                </div>

            </article>

        </section>

        <section className="hidden bg-orange-600 lg:col-span-1 lg:h-full lg:flex opacity-80 hover:opacity-[.85] hover:scale-[1.01] duration-150 cursor-pointer">
            <article className="flex h-full w-full justify-center items-center">
                <a href="https://github.com/gab-h3nrique">
                    <h1 className="text-8xl text-white font-bold ">
                        Savassi 
                        <br></br> 
                        Notebooks
                        <br></br>
                        <p className="text-xl font-semibold hover:scale-x-105 duration-200 text-white w-fit">Developed and Designed by Gabriel Henrique</p>
                    </h1>
                </a>
            </article>
        </section>

    </main>

    )
  }
  
  export default Login