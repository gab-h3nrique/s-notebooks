import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import Api from '../../lib/api';

import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/auth';
import Snotebooks from '../components/icons/Snotebooks';

const Home: NextPage = () => {
 
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [button, setButton] = useState(false);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false)

  const { setAuthUserLogin }:any = useContext(AuthContext)

  const login = async() => {
    setLoading(true)
    let data = await Api.auth('/api/login', {name, email, password});
    if(data.accessToken && data.user) {
      await setAuthUserLogin(data.user)
      Router.push('/app/atendimento');
    } else {
      setMessage(data.message);
    }
    setLoading(false)
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
