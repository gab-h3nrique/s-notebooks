import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../context/UserContext'
import { NotificationContext } from '../context/NotificationContext'
// import { BudgetProvider } from '../context/budget'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <NotificationContext>
      <UserProvider>  {/* // Passando usuario logado para todos os componentes */}

        {/* <BudgetProvider>    // Passando orcamento selecionado para todos os componentes */}

          <Component {...pageProps} />


        {/* </BudgetProvider> */}

      </UserProvider>
    </NotificationContext>

  )
}

export default MyApp
