
/* components */
import Footer from './Footer';
import Header from './Header';
import Asidebar from './barComponent/Asidebar';
import Sidebar from './barComponent/Sidebar';
import NavBar from './barComponent/NavBar';
// import Navigation from '../navigation/Navigation';
/* components */

export interface Props {
    page: string;
    children: React.ReactNode
}


const Layout = ({page, children}:Props) => {
    return (
        <>
            <Header/>

            <div className="flex flex-col h-screen w-screen gap-1">

                <NavBar/>

                <div className="flex justify-center h-full bg-slate-200 pb-3 px-3">

                    <section className="flex w-[105rem] bg-slate-200 p-3">

                        <Sidebar menu={page}/>

                        <main className="flex flex-col w-full gap-4 pt-4 px-4">{children}</main>

                        {/* <Asidebar/> */}
                        
                    </section>

                </div>

            </div>


            {/* <Footer/> */}
        </>
    )
}
export default Layout;