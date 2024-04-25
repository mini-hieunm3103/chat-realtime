import {useContext} from "react";
import MessageContext from "@/Pages/Chatting/Partials/Messages/Message/MessageContext.jsx";

const RecallMessageBtn = ({messageId}) => {
    const {setRecallMessageId} = useContext(MessageContext)
    return (
        <div onClick={() => {
            setRecallMessageId(messageId)
        }}
             className="dropdown-item d-flex align-items-center text-danger cursor-pointer">
            Recall <span className="ml-auto pl-5 fe-rotate-ccw"></span>
        </div>
    )
}
export default RecallMessageBtn
