
/* components */
import Footer from './Footer';
import Header from './Header';
import Asidebar from './barComponent/Asidebar';
import Sidebar from './barComponent/Sidebar';
import NavBar from './barComponent/NavBar';
/* components */

export interface Props {
    page: string;
    children: React.ReactNode
}


const Layout = ({page, children}:Props) => {

    // useAuth.add

    return (
            

        <div className="flex flex-col w-screen h-screen bg-slate-200 gap-1 border-t-[3px] border-orange-600">

            {/* <NavBar/> */}

            <div className="flex p-3 h-full w-full">

                <Sidebar menu={page}/>

                <main className="flex flex-col w-full h-full gap-4 px-4">
                    {children}
                </main>

                {/* <Asidebar/> */}
                    
            </div>

            {/* <Footer/> */}
        </div>


    )
}
export default Layout;