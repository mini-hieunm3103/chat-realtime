import Navbar from "@/Layouts/Authenticated/Navbar/Navbar.jsx";
import Sidebar from "@/Layouts/Authenticated/Sidebar/Sidebar.jsx";
export default function Authenticated({authLayoutData, children, open= false}) {
    return (
        <>
            <Navbar
                route={authLayoutData.currentRoute}
            />
            <Sidebar
                user={authLayoutData.user}
                route={authLayoutData.currentRoute}
            />
            <div className={"main " + ((open) ? " main-visible" : "")} data-mobile-height="">
                {children}
            </div>
        </>
    );
}
