import RecallMessageBtn from "@/Pages/Chatting/Partials/Messages/Popup/Partials/RecallMessageBtn.jsx";
import {useContext} from "react";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import {CopyMessageContentText} from "@/Pages/Chatting/Partials/Messages/Popup/Partials/CopyMessageContentText.jsx";

export default function TextMessagePopup({message}){
    const {userLogin} = useContext(AuthenticatedContext);
    const handleCopy = () => {
        navigator.clipboard.writeText(message.message_text);
    }
    return (
        <div className="dropdown">
            <a className="text-muted opacity-60 ml-3" href="#" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false" >
                <i className="fe-more-vertical"></i>
            </a>

            <div className="dropdown-menu">
                {!message.is_recalled
                    ? <CopyMessageContentText message={message} />
                    : null
                }
                <hr style={{
                    marginTop: "0.9rem",
                    marginBottom: ".5rem",
                    width: "112px",
                    borderTop: "1px solid rgba(124, 117, 125, .5)"
                }}/>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    View details <span className="ml-auto pl-5 fe-alert-octagon"></span>
                </a>
                <hr style={{
                    marginTop: "0.9rem",
                    marginBottom: ".5rem",
                    width: "112px",
                    borderTop: "1px solid rgba(124, 117, 125, .5)"
                }}/>
                {!message.is_recalled && message.user_id === userLogin.id
                    ? <RecallMessageBtn messageId={message.message_id} />
                    : null
                }

                <a className="dropdown-item d-flex align-items-center text-danger" href="#">
                    Delete <span className="ml-auto pl-5 fe-trash-2"></span>
                </a>
            </div>
        </div>
    )
}
