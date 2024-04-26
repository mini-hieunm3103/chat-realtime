import React, {useContext, useState} from "react";
import MessageContext from "@/Pages/Chatting/Partials/Messages/Message/MessageContext.jsx";
import TextMessagePopup from "@/Pages/Chatting/Partials/Messages/Popup/TextMessagePopup.jsx";
import Highlighter from "react-highlight-words";
import MessageRecalled from "@/Pages/Chatting/Partials/Messages/Message/MessageRecalled.jsx";
import FileMessagePopup from "@/Pages/Chatting/Partials/Messages/Popup/FileMessagePopup.jsx";
import {
    appUrl,
    heightMessageVideo,
    widthMessageDocument,
    widthMessageImage,
    widthMessageVideo
} from "@/Helper/config.js";
import {asset, renameFileSize, shortenFileName} from "@/Helper/functions.js";

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
                         title={message.sendTime.full}>
                        {message.type === "text" ? <TextContent msgBorderRadius={msgBorderRadius}/> : null}
                        {message.type === "image" ? <ImageContent/> : null}
                        {message.type === "video" ? <VideoContent /> : null}
                        {message.type === "audio" ? <AudioContent/> : null}
                        {message.type === "document" ? <DocumentContent msgBorderRadius={msgBorderRadius}/> : null}
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
        setRecallMessageId,
    } = useContext(MessageContext)

    return (
        <>
            <TextMessagePopup message={message} setRecallMessageId={setRecallMessageId}/>
            {!message.is_recalled
                ? <div className="message-content bg-primary text-white" style={{borderRadius: msgBorderRadius}}>
                    <Highlighter
                        highlightClassName="highlighted-text"
                        searchWords={[searchMessageKeyword]}
                        autoEscape={true}
                        textToHighlight={message.message_text}
                    />
                </div>
                : <MessageRecalled position="right"/>
            }
        </>
    )
}
const ImageContent = () => {
    const {
        message,
    } = useContext(MessageContext)
    return (<>
        <FileMessagePopup message={message}/>
        {!message.is_recalled
            ? <div className={"message-content p-0 " + widthMessageImage}>
                <div className="form-row py-3">
                <div className="col">
                        <img className="img-fluid rounded"
                             src={asset(message.message_file.path)}
                             data-action="zoom" alt={message.message_file.name}/>
                    </div>
                </div>
            </div>
            : <MessageRecalled position={"right"}/>
        }
    </>)
}
const VideoContent = () => {
    const {
        message,
    } = useContext(MessageContext)
    return (<>
        <FileMessagePopup message={message}/>
        {!message.is_recalled
            ? <div className="message-content p-0 mt-2">
                <div className="form-row">
                    <div className="col d-flex justify-content-end">
                        <video width={widthMessageVideo} height={heightMessageVideo} controls>
                            <source src={asset(message.message_file.path)}/>
                        </video>
                    </div>
                </div>
            </div>
            : <MessageRecalled position={"right"}/>
        }
    </>)
}
const AudioContent = () =>{
    const {
        message,
    } = useContext(MessageContext)
    const [mimeType, setMimeType] = useState(null)
    fetch(appUrl + asset(message.message_file.path))
        .then(res => {
            setMimeType(res.headers.get('Content-Type'))
        })
    return  (<>
        <FileMessagePopup message={message}/>
        {!message.is_recalled
            ? <div className="message-content p-0 mt-2">
                <div className="form-row">
                    <div className="col d-flex justify-content-end">
                        <audio controls >
                            <source src={asset(message.message_file.path)} type={mimeType}/>
                        </audio>
                    </div>
                </div>
            </div>
            : <MessageRecalled position={"right"}/>
        }
    </>)
}
const DocumentContent = ({msgBorderRadius}) => {
    const {message} = useContext(MessageContext);
    const fileName = message.message_file.name;
    const fileExtension = message.message_file.name.split('.').pop();
    const fileSize = renameFileSize(message.message_file.size);
    return (<>
        <FileMessagePopup message={message}/>
        {!message.is_recalled
            ? <div className="message-content text-white bg-primary"
                   style={{borderRadius: msgBorderRadius}}
            >
                <div className="media">
                    <a href="#" className="icon-shape mr-5">
                        <i className="fe-paperclip"></i>
                    </a>
                    <a className="media-body overflow-hidden flex-fill text-white" href={asset(message.message_file.path)} download={true} >
                        <span style={{width: widthMessageDocument}}
                           className="d-block text-truncate font-medium text-reset"
                        >{shortenFileName(fileName)}</span>
                        <ul className="list-inline small mb-0">
                            <li className="list-inline-item">
                                <span className="t">{fileSize}</span>
                            </li>
                            <li className="list-inline-item">
                                <span className="text-uppercase">{fileExtension}</span>
                            </li>
                        </ul>
                    </a>
                </div>
            </div>
            : <MessageRecalled position={"right"}/>
        }
    </>)
}
export default React.memo(RightMessage);
