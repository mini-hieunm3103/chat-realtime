import RecallMessageBtn from "@/Pages/Chatting/Partials/Messages/Popup/Partials/RecallMessageBtn.jsx";
import {useContext} from "react";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import {CopyMessageContentTextBtn} from "@/Pages/Chatting/Partials/Messages/Popup/Partials/CopyMessageContentTextBtn.jsx";
import MessagePopupLayout from "@/Pages/Chatting/Partials/Messages/Popup/MessagePopupLayout.jsx";

export default function TextMessagePopup({message}){
    const {userLogin} = useContext(AuthenticatedContext);
    return (
        <MessagePopupLayout>
            {!message.is_recalled
                ? <>
                    <CopyMessageContentTextBtn message={message}/>
                    <MessagePopupLayout.HorizontalLine/>
                </>
                : null
            }
            <a className="dropdown-item d-flex align-items-center" href="#">
                View details <span className="ml-auto pl-5 fe-alert-octagon"></span>
            </a>
            <MessagePopupLayout.HorizontalLine/>
            {!message.is_recalled && message.user_id === userLogin.id
                ? <RecallMessageBtn messageId={message.message_id} />
                : null
            }
            <a className="dropdown-item d-flex align-items-center text-danger" href="#">
                Delete <span className="ml-auto pl-5 fe-trash-2"></span>
            </a>
        </MessagePopupLayout>
    )
}
