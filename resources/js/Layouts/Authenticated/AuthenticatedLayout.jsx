import Navbar from "@/Layouts/Authenticated/Navbar/Navbar.jsx";
import Sidebar from "@/Layouts/Authenticated/Sidebar/Sidebar.jsx";
import InviteFriendsModal from "@/Components/Modals/InviteFriendsModal.jsx";
import {Route} from "react-router-dom";
import AddUsersToChatroom from "@/Components/Modals/AddUsersToChatroom.jsx";
import {convertBaseJs} from "@/Helper/functions.js";
export default function Authenticated({authLayoutData, children, open= false}) {
    console.log(convertBaseJs('ch-1765', 37 , 10))
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
            <InviteFriendsModal />
            {(authLayoutData.hasOwnProperty('isGroup') && authLayoutData.isGroup === true) ? <AddUsersToChatroom /> : null }
        </>
    );
}
