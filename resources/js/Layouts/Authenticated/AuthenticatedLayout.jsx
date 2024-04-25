import Navbar from "@/Layouts/Authenticated/Navbar/Navbar.jsx";
import Sidebar from "@/Layouts/Authenticated/Sidebar/Sidebar.jsx";
import {useEchoChatUsersId} from "@/Helper/hooks.js";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
export default function Authenticated({userLogin, currentRoute, children, open= false}) {
    const allUserOnlineIds  = useEchoChatUsersId();
    return (
        <AuthenticatedContext.Provider value={{allUserOnlineIds, userLogin, currentRoute}}>
            <Navbar
                route={currentRoute}
            />
            <Sidebar
                user={userLogin}
                route={currentRoute}
            />
            <div className={"main " + ((open) ? " main-visible" : "")} data-mobile-height="">
                {children}
            </div>
        </AuthenticatedContext.Provider>
    );
}
