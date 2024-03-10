import AuthenticatedLayout from '@/Layouts/Authenticated/AuthenticatedLayout';
import {useLocation} from "react-router-dom";
import {useForm} from "@inertiajs/react";
import Swal from "sweetalert2";
import Group from "@/Pages/Chatting/Room/Group.jsx";
import DirectMessage from "@/Pages/Chatting/Room/DirectMessage.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
export default function Chat({ auth, isGroup, channelId, usersChannel }) {
    const showStatus = (message, type="success", title="Handle Successfully", position="top-end", time=2000) => {
        Swal.fire({
            position: position,
            icon: type,
            title: title,
            text: message,
            showConfirmButton: false,
            timer: time
        });
    }
    const authLayoutData = {
        user: auth.data,
        currentRoute: useLocation().pathname,
        isGroup: isGroup
    }
    return (
        <>
            <AuthenticatedLayout
                open={true}
                authLayoutData={authLayoutData}
            >
                {(isGroup)
                    ?
                    <Group
                        channelId = {channelId}
                    />
                    :
                    <DirectMessage
                        usersChannel = {usersChannel.data}
                        auth= {auth.data}
                        channelId = {channelId}
                    />}
            </AuthenticatedLayout>
        </>
    );
}
