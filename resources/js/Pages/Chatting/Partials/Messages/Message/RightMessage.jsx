import React, {useContext} from "react";
import MessageContext from "@/Pages/Chatting/Partials/Messages/Message/MessageContext.jsx";
import TextMessagePopup from "@/Pages/Chatting/Partials/Messages/Popup/TextMessagePopup.jsx";
import Highlighter from "react-highlight-words";
import MessageRecalled from "@/Pages/Chatting/Partials/Messages/Message/MessageRecalled.jsx";

const style = {
    messageMarginBottom: " mb-2",
    groupMessages: {
        marginBottom: " mb-7",

        oneMsgInGroupBorderRadius: ".9rem .9rem .625rem .9rem",
        firstMsgBorderRadius: ".9rem .9rem 5px .9rem", // top-left top-right bt-right bt-left
        middleMsgBorderRadius: ".9rem 5px 5px .9rem",
        lastMsgBorderRadius: ".9rem 5px .625rem .9rem",
    },
}
const RightMessage = () => {
    const {
        message,
        isLastMsgInGroupMessages,
    } = useContext(MessageContext)
    return (
        <div
            className={"message message-right " + style.messageMarginBottom + (isLastMsgInGroupMessages ? style.groupMessages.marginBottom : "")}>

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
        <div className="d-flex align-items-center justify-content-end">
            <TextMessagePopup message={message} setRecallMessageId={setRecallMessageId}/>
            <div className="message-content bg-primary text-white" style={{borderRadius: msgBorderRadius}}
                 title={message.sendTime.full}>
                <div>
                    {!message.is_recalled
                        ?  <Highlighter
                            highlightClassName="highlighted-text"
                            searchWords={[searchMessageKeyword]}
                            autoEscape={true}
                            textToHighlight={message.text_content}
                        />
                        : <MessageRecalled position="right" />
                    }
                </div>
            </div>

        </div>
    )
}
export default React.memo(RightMessage);
