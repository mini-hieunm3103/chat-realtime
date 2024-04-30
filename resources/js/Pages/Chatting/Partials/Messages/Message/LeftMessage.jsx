import React, {useContext, useState} from "react";
import MessageContext from "@/Pages/Chatting/Partials/Messages/Message/MessageContext.jsx";
import TextMessagePopup from "@/Pages/Chatting/Partials/Messages/Popup/TextMessagePopup.jsx";
import Highlighter from "react-highlight-words";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import MessageRecalled from "@/Pages/Chatting/Partials/Messages/Features/MessageRecalled.jsx";
import {asset, renameFileSize, shortenFileName} from "@/Helper/functions.js";
import {
    appUrl,
    heightMessageVideo,
    widthMessageDocument,
    widthMessageImage,
    widthMessageVideo
} from "@/Helper/config.js";
import FileMessagePopup from "@/Pages/Chatting/Partials/Messages/Popup/FileMessagePopup.jsx";
import Linkify from "react-linkify";

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
    const contentMapping = {
        text: <TextContent msgBorderRadius={msgBorderRadius}/> ,
        image: <ImageContent/> ,
        video: <VideoContent /> ,
        audio: <AudioContent/> ,
        document: <DocumentContent msgBorderRadius={msgBorderRadius}/> ,
    };
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
                    {isFirstMsgInGroupMessages ? <h6 className="mb-2 ml-5">{message.user.name}</h6> : null}
                    <div className="d-flex flex-row align-items-center"
                         title={message.sendTime.full}>
                        {message.is_recalled
                            ? <MessageRecalled position="left" style={{borderRadius: msgBorderRadius}} />
                            : contentMapping[message.type]
                        }
                        </div>
                </div>
            </div>
        </div>
    )
}
const TextContent = ({msgBorderRadius}) => {
    const {
        searchMessageKeyword,
        message,
    } = useContext(MessageContext)
    return (
        <>
            <div className="message-content bg-light text-break position-relative" style={{borderRadius: msgBorderRadius}}>
                {/*<Highlighter*/}
                {/*    highlightClassName="highlighted-text"*/}
                {/*    searchWords={[searchMessageKeyword]}*/}
                {/*    autoEscape={true}*/}
                {/*    textToHighlight={message.message_text}*/}
                {/*/>*/}
                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a href={decoratedHref} key={key} target="_blank" className="text-decoration-underline text-muted">
                        {decoratedText}
                    </a>
                )}>
                    {message.message_text}
                </Linkify>
            </div>
            <TextMessagePopup message={message}/>
        </>
    )
}
const ImageContent = () => {
    const {message} = useContext(MessageContext);
    return (
        <>
            <div className={"message-content p-0 " + widthMessageImage}>
                <div className="form-row py-3">
                    <div className="col">
                        <img className="img-fluid rounded"
                             src={asset(message.message_file.path)}
                             data-action="zoom" alt={message.message_file.name}/>
                    </div>
                </div>
            </div>
            <FileMessagePopup message={message}/>
        </>
    )
}
const VideoContent = () => {
    const {
        message,
    } = useContext(MessageContext)
    return (
        <>
            <div className="message-content p-0 mt-2">
                <div className="form-row">
                    <div className="col d-flex justify-content-end">
                        <video width={widthMessageVideo} height={heightMessageVideo} controls data-action="zoom">
                            <source src={asset(message.message_file.path)}/>
                        </video>
                    </div>
                </div>
            </div>
            <FileMessagePopup message={message}/>
        </>
    )
}
const AudioContent = () => {
    const {
        message,
    } = useContext(MessageContext)
    return (
        <>
            <div className="message-content p-0 mt-2">
                <div className="form-row">
                    <div className="col d-flex justify-content-end">
                        <audio controls>
                            <source src={asset(message.message_file.path)}/>
                        </audio>
                    </div>
                </div>
            </div>
            <FileMessagePopup message={message}/>
        </>
    )
}
const DocumentContent = ({msgBorderRadius}) => {
    const {message} = useContext(MessageContext);
    const fileName = message.message_file.name;
    const fileExtension = message.message_file.name.split('.').pop();
    const fileSize = renameFileSize(message.message_file.size);
    return (
        <>
            <div className="message-content bg-light text-white" style={{borderRadius: msgBorderRadius}}>
                <div className="media">
                    <a href="#" className="icon-shape mr-5">
                        <i className="fe-paperclip"></i>
                    </a>
                    <div className="media-body overflow-hidden flex-fill">
                        <a href="#" style={{width: widthMessageDocument}}
                           className="d-block text-truncate font-medium text-reset"
                        >{shortenFileName(fileName)}</a>
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
            <FileMessagePopup message={message}/>
        </>
    )
}
export default React.memo(LeftMessage);
