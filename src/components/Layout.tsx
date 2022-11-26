
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
            

            <div className="flex flex-col gap-1 w-screen h-screen">

                {/* <NavBar></NavBar> */}

                <div className="flex justify-center h-full w-full border-t-[3px] border-orange-600">

                    <section className="flex justify-around w-full p-2">

                        <Sidebar menu={page}/>

                        {children}

                        {/* <Asidebar/> */}
                        
                    </section>

                </div>

            </div>


            {/* <Footer/> */}
        </>
    )
}
export default Layout;