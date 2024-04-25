import React from "react";
import AuthenticatedLayout from '@/Layouts/Authenticated/AuthenticatedLayout';
import {useLocation} from "react-router-dom";
import Swal from "sweetalert2";
import Group from "@/Pages/Chatting/Room/Group.jsx";
import DirectMessage from "@/Pages/Chatting/Room/DirectMessage.jsx";
export default function Chat({ auth, isGroup, channelId }) {
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
    return (
        <>
            <AuthenticatedLayout
                open={true}
                userLogin = {auth.data}
                currentRoute= {useLocation().pathname}
            >
                {(isGroup)
                    ?
                    <GroupComponent auth={auth.data} channelId={channelId} />
                    :
                    <DirectMessageComponent auth={auth.data} channelId={channelId} />
                }
            </AuthenticatedLayout>
        </>
    );
}
const GroupComponent = React.memo(function GroupComponent({ usersChannel, auth, channelId }) {
    return <Group usersChannel={usersChannel} auth={auth} channelId={channelId} />;
});

const DirectMessageComponent = React.memo(function DirectMessageComponent({auth, channelId }) {
    return <DirectMessage auth={auth} channelId={channelId} />;
});
