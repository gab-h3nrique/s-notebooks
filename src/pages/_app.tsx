import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth'
// import { BudgetProvider } from '../context/budget'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <AuthProvider>  {/* // Passando usuario logado para todos os componentes */}

      {/* <BudgetProvider>    // Passando orcamento selecionado para todos os componentes */}

        <Component {...pageProps} />

      {/* </BudgetProvider> */}

    </AuthProvider>

  )
}

export default MyApp
