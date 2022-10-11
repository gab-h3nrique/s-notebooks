import type { GetStaticPaths, GetServerSideProps, NextPage } from 'next'
import Layout from '../../components/Layout'
import Sidebar from '../../components/sidebar/Sidebar'




const Atendimento: NextPage = (props) => {

    return (
  
      <Layout>
        <Sidebar menu={"atendimento"}/>
  
      </Layout>
  
    )
  }
  
  export default Atendimento
  
  