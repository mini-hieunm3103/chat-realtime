import Chat from "@/Layouts/Authenticated/Sidebar/Partials/Chat.jsx";
import CreateChatRoom from "@/Layouts/Authenticated/Sidebar/Partials/CreateChatroom.jsx";
import Friends from "@/Layouts/Authenticated/Sidebar/Partials/Friends.jsx";
import ShowProfile from "@/Layouts/Authenticated/Sidebar/Partials/ShowProfile.jsx";
import {Dialog} from "@headlessui/react";
export default function Sidebar({user}){
    return (
        <div className="sidebar">
            <div className="tab-content h-100" role="tablist">
                <CreateChatRoom />
                <Friends />
                <Chat />
                <ShowProfile
                    user = {user}
                />
            </div>
        </div>

    )
}
