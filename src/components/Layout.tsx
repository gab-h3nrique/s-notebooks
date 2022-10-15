
/* components */
import Footer from './Footer';
import Header from './Header';
import Asidebar from './sidebar/Asidebar';
import Sidebar from './sidebar/Sidebar';
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
            <div className="flex justify-center h-screen w-sreen bg-gray-200 p-3">

                <section className="flex h-full w-[105rem] bg-gray-200 p-3">
                    <Sidebar menu={page}/>
                        <main className="flex flex-col w-full gap-4 p-4">
                            {children}
                        </main>
                    <Asidebar/>
                </section>

            </div>
            {/* <Footer/> */}
        </>
    )
}
export default Layout;