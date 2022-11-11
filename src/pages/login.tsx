import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import Api from '../../lib/api';

import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/auth';

const Home: NextPage = () => {
 
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [button, setButton] = useState(false);
  const [message, setMessage] = useState();

  const { setAuthUserLogin }:any = useContext(AuthContext)

  const login = async() => {
    let data = await Api.auth('/api/login', 'POST', {name, email, password});
    if(data.accessToken && data.user) {
      await setAuthUserLogin(data.user)
      Router.push('/app/atendimento');
    } else {
      setMessage(data.message);
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
      <LoginForm user={ {setName, setEmail, setPassword, message, button, login} } />
  </>
)
}

export default Home
