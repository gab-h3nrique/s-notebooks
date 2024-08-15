
/* components */
import Footer from './Footer';
import Header from './Header';
import Asidebar from './barComponent/Asidebar';
import Sidebar from './barComponent/Sidebar';
import NavBar from './barComponent/NavBar';
import { NotificationContext } from '../context/NotificationContext';
/* components */

export interface Props {
    page: string;
    children: React.ReactNode
}


const Layout = ({page, children}:Props) => {

    // useAuth.add

    return (
            

        <NotificationContext>
            <div className="flex flex-col w-screen h-screen relative bg-slate-200 gap-1 border-t-[3px] border-orange-600">

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
        </NotificationContext>


    )
}
export default Layout;