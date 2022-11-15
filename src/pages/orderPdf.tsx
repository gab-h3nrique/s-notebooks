import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import Api from '../../lib/api';

import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/auth';

interface Props {
  content: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query


  // const {response} = await Api.get('/api/auth/orders', {id:id})



  return { 
    // props: { content: response ? JSON.parse(response) : null }
    props: { content: 'a' }
  }
  
}

const Home: NextPage<Props> = ({content}) => {

  // const { id } = props

  const [order, setOrder] = useState<any>();

  // const getOrder = async () => {
  //   const {response} = await Api.get('/api/auth/orders', {id:38})
  //   setOrder(response)
  // }

  useEffect(()=>{
    setOrder(content)
    // (async () => {
    //   setOrder(response)
    //   await getOrder()
    // })()
  },[])

return (
  <>
      <div>{order}</div>
      <div>{baseUrl}</div>
  </>
)
}

export default Home
