import UserAvatar from "@/Components/UserAvatar.jsx";
import DropdownMessage from "@/Pages/Chatting/Partials/DropdownMessage.jsx";

export default function MyMessage({message, keyword}){
    console.log(message)
    const auth = message.user;
    return (
        <div className="message message-right">
            <UserAvatar
                user={auth}
                isOnline={true}
                size="sm"
                className=" ml-4 ml-lg-5 d-none d-lg-block "
            />
            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex align-items-center justify-content-end">
                        <DropdownMessage />
                        <div className="message-content bg-primary text-white">
                            <div>{message.content}</div>

                            <div className="mt-1">
                                <small className="opacity-65">{}</small>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
