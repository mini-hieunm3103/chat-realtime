import Navbar from "@/Layouts/Authenticated/Navbar/Navbar.jsx";
import Sidebar from "@/Layouts/Authenticated/Sidebar/Sidebar.jsx";
import {useEchoChatUsersId} from "@/Helper/hooks.js";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
export default function Authenticated({authLayoutData, children, open= false}) {
    const allUserOnlineIds  = useEchoChatUsersId();
    return (
        <AuthenticatedContext.Provider value={{allUserOnlineIds, authLayoutData}}>
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
        </AuthenticatedContext.Provider>
    );
}
