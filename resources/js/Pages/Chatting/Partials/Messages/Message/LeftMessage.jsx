import React, {useContext} from "react";
import MessageContext from "@/Pages/Chatting/Partials/Messages/Message/MessageContext.jsx";
import TextMessagePopup from "@/Pages/Chatting/Partials/Messages/Popup/TextMessagePopup.jsx";
import Highlighter from "react-highlight-words";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import MessageRecalled from "@/Pages/Chatting/Partials/Messages/Message/MessageRecalled.jsx";


const style = {
    invisibleAvatar: <div className={"avatar avatar-sm mr-4 mr-lg-5 invisible"}></div>,
    messageMarginBottom: " mb-2",
    groupMessages: {
        marginBottom: " mb-7",
        oneMsgInGroupBorderRadius: ".9rem .9rem .9rem .625rem",
        firstMsgBorderRadius: ".9rem .9rem .9rem 5px", // top-left top-right bt-right bt-left
        middleMsgBorderRadius: "5px .9rem .9rem 5px",
        lastMsgBorderRadius: "5px .9rem .9rem 1px",
    }
}
const LeftMessage = () => {
    const {allUserOnlineIds} = useContext(AuthenticatedContext)
    const {
        message,
        isLastMsgInGroupMessages
    } = useContext(MessageContext)
    return (
        <div
            className={"message " + style.messageMarginBottom + (isLastMsgInGroupMessages ? style.groupMessages.marginBottom : "")}>
            {isLastMsgInGroupMessages
                ? <UserAvatar
                    user={message.user}
                    isOnline={allUserOnlineIds.includes(message.user.id)}
                    showProfile={true}
                    size="sm"
                    className=" mr-4 mr-lg-5 "
                />
                : style.invisibleAvatar
            }
            <div className="message-body">
                <div className="message-row">
                    {
                        message.type === "text" ? <TextMessage /> : null
                    }
                </div>
            </div>
        </div>
    )
}
const TextMessage = () => {
    const {
        searchMessageKeyword,
        message,
        isFirstMsgInGroupMessages,
        isLastMsgInGroupMessages,
        setRecallMessageId
    } = useContext(MessageContext)
    let msgBorderRadius;
    if (isFirstMsgInGroupMessages && isLastMsgInGroupMessages) {
        msgBorderRadius = style.groupMessages.oneMsgInGroupBorderRadius
    } else if (isFirstMsgInGroupMessages) {
        msgBorderRadius = style.groupMessages.firstMsgBorderRadius
    } else if (isLastMsgInGroupMessages) {
        msgBorderRadius = style.groupMessages.lastMsgBorderRadius
    } else {
        msgBorderRadius = style.groupMessages.middleMsgBorderRadius
    }
    return (
        <div className="d-flex flex-row align-items-center">
            <div className="message-content bg-light position-relative" style={{borderRadius: msgBorderRadius}}
                 title={message.sendTime.full}>
                {!message.is_recalled
                    ?  <Highlighter
                        highlightClassName="highlighted-text"
                        searchWords={[searchMessageKeyword]}
                        autoEscape={true}
                        textToHighlight={message.text_content}
                    />
                    : <MessageRecalled position="left"/>
                }
            </div>
            <TextMessagePopup message={message} setRecallMessageId={setRecallMessageId}/>
        </div>
    )
}
export default React.memo(LeftMessage);
