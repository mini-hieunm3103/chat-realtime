import Dialog from "@/Layouts/Authenticated/Sidebar/Partials/Dialog.jsx";
import CreateChatRoom from "@/Layouts/Authenticated/Sidebar/Partials/CreateChatroom.jsx";
import GlobalUsers from "@/Layouts/Authenticated/Sidebar/Partials/GlobalUsers.jsx";
import ShowProfile from "@/Layouts/Authenticated/Sidebar/Partials/ShowProfile.jsx";
export default function Sidebar({user}){
    return (
        <div className="sidebar">
            <div className="tab-content h-100" role="tablist">
                <CreateChatRoom
                    startUp = {true}
                />
                <GlobalUsers
                    startUp = {false}
                />
                <Dialog
                    startUp = {false}
                />
                <ShowProfile
                    startUp = {false}
                    user = {user}
                />
            </div>
        </div>

    )
}
