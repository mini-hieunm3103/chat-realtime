import Dialog from "@/Layouts/Authenticated/Sidebar/Partials/Dialog.jsx";
import CreateGroup from "@/Layouts/Authenticated/Sidebar/Partials/CreateGroup.jsx";
import GlobalFriends from "@/Layouts/Authenticated/Sidebar/Partials/GlobalFriends.jsx";
import ShowProfile from "@/Layouts/Authenticated/Sidebar/Partials/ShowProfile.jsx";
import Notification from "@/Layouts/Authenticated/Sidebar/Partials/Notification.jsx";
export default function Sidebar({user}){
    return (
        <div className="sidebar">
            <div className="tab-content h-100" role="tablist">
                <CreateGroup
                    startUp = {false}
                />
                <GlobalFriends
                    startUp = {false}
                />
                <Dialog
                    startUp = {true}
                />
                <ShowProfile
                    startUp = {false}
                    user = {user}
                />
                <Notification />
            </div>
        </div>

    )
}
