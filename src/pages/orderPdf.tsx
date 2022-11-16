import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import Api from '../../lib/api';

interface Props {
  content: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const { host:baseUrl } = context.req.headers

  const {response} = await Api.get(`http://${baseUrl}/api/teste`, {id:id})

  return { 
    props: { content: response }
  }
  
}

const Home: NextPage<Props> = ({content}) => {

  const [order, setOrder] = useState<any>();

  useEffect(()=>{
    (async () => {
      setOrder(content)
    })()
  },[])

return (
  <>
      <main className="flex overflow-auto flex-col gap-4 px-4 bg-white w-[210mm] h-[297mm] m-auto mt-10" >{order?.status}</main>
  </>
)
}

export default Home

