import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import Api from '../../lib/api';

import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import { setCookie } from '../../lib/cookie';
import { userContext } from '../context/UserContext';

const Home: NextPage = () => {
 
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [button, setButton] = useState(false);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false)

  const { setUser } = userContext()

  const login = async() => {

    try {
      
      setLoading(true)
  
      let { user, accessToken } = await Api.auth('/api/login', { name, email, password });
  
      if(!accessToken || user) return setMessage(message);
  
      setUser(user)

      await setCookie('auth', accessToken, 360)
  
      Router.push('/app/atendimento');
      
    } catch (error: any) {

      console.log(error)
      setMessage(error.message)
      
    } finally {
      
      setLoading(false)

    }


  }

  useEffect(() => {
    if(email && password) {
      setButton(true)
    } else {
      setButton(false)
    }
  },[email, password])

return (
  <>
    <LoginForm user={ {setName, setEmail, setPassword, message, button, loading, login} } />
  </>
)
}

export default Home
