import React, {useContext, useState} from "react";
import MessageContext from "@/Pages/Chatting/Partials/Messages/Message/MessageContext.jsx";
import TextMessagePopup from "@/Pages/Chatting/Partials/Messages/Popup/TextMessagePopup.jsx";
import Highlighter from "react-highlight-words";
import MessageRecalled from "@/Pages/Chatting/Partials/Messages/Message/MessageRecalled.jsx";
import {asset, renameFileSize} from "@/Helper/functions.js";
import {
    appUrl,
    heightMessageVideo,
    widthMessageDocument,
    widthMessageImage,
    widthMessageVideo
} from "@/Helper/config.js";

const style = {
    messageMarginBottom: " mb-2",
    groupMessages: {
        marginBottom: " mb-5",

        oneMsgInGroupBorderRadius: ".9rem .9rem .625rem .9rem",
        firstMsgBorderRadius: ".9rem .9rem 5px .9rem", // top-left top-right bt-right bt-left
        middleMsgBorderRadius: ".9rem 5px 5px .9rem",
        lastMsgBorderRadius: ".9rem 5px .625rem .9rem",
    },
}
const RightMessage = () => {
    const {
        message,
        isFirstMsgInGroupMessages,
        isLastMsgInGroupMessages,
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
        <div
            className={"message message-right " + style.messageMarginBottom + (isLastMsgInGroupMessages ? style.groupMessages.marginBottom : "")}>
            <div className="message-body">
                <div className="message-row">
                    <div className="d-flex align-items-center justify-content-end"
                         style={{borderRadius: msgBorderRadius}}
                         title={message.sendTime.full}>
                        {message.type === "text" ? <TextContent/> : null}
                        {message.type === "image" ? <ImageContent/> : null}
                        {message.type === "video" ? <VideoContent/> : null}
                        {message.type === "audio" ? <AudioContent/> : null}
                        {message.type === "document" ? <DocumentContent/> : null}
                    </div>

                </div>

            </div>
        </div>
    )
}
const TextContent = () => {
    const {
        searchMessageKeyword,
        message,
        setRecallMessageId,
    } = useContext(MessageContext)

    return (
        <>
            <TextMessagePopup message={message} setRecallMessageId={setRecallMessageId}/>
            <div className="message-content bg-primary text-white">
                {!message.is_recalled
                    ? <Highlighter
                        highlightClassName="highlighted-text"
                        searchWords={[searchMessageKeyword]}
                        autoEscape={true}
                        textToHighlight={message.message_text}
                    />
                    : <MessageRecalled position="right"/>
                }
            </div>
        </>
    )
}
const ImageContent = () => {
    const {
        message,
    } = useContext(MessageContext)
    return (
        <div className="message-content p-0">
            <div className="form-row">
                <div className="col d-flex justify-content-end">
                    <img className={"img-fluid rounded "+ widthMessageImage}
                         src={asset(message.message_file.path)}
                         data-action="zoom" alt={message.message_file.name}/>
                </div>
            </div>
        </div>
    )
}
const VideoContent = () => {
    const {
        message,
    } = useContext(MessageContext)
    return (
        <div className="message-content p-0 mt-2">
            <div className="form-row">
                <div className="col d-flex justify-content-end">
                    <video width={widthMessageVideo} height={heightMessageVideo} controls>
                        <source src={asset(message.message_file.path)}/>
                    </video>
                </div>
            </div>
        </div>
    )
}
const AudioContent = () =>{
    const {
        message,
    } = useContext(MessageContext)
    return (
        <div className="message-content p-0 mt-2">
            <div className="form-row">
                <div className="col d-flex justify-content-end">
                    <audio controls>
                        <source src={asset(message.message_file.path)}/>
                    </audio>
                </div>
            </div>
        </div>
    )
}
const DocumentContent = () => {
    const {message} = useContext(MessageContext);
    const fileName = message.message_file.name;
    const fileExtension = message.message_file.name.split('.').pop();
    const fileSize = renameFileSize(message.message_file.size);
    return (
        <div className="message-content bg-primary text-white">
            <div className="media">
                <a href="#" className="icon-shape mr-5">
                    <i className="fe-paperclip"></i>
                </a>
                <div className="media-body overflow-hidden flex-fill">
                    <a href="#" style={{width: widthMessageDocument}}
                       className="d-block text-truncate font-medium text-reset"
                    >{fileName}</a>
                    <ul className="list-inline small mb-0">
                        <li className="list-inline-item">
                            <span className="t">{fileSize}</span>
                        </li>
                        <li className="list-inline-item">
                            <span className="text-uppercase">{fileExtension}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default React.memo(RightMessage);
