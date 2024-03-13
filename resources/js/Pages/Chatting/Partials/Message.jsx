import PopupMessage from "@/Pages/Chatting/Partials/PopupMessage.jsx";
import Highlighter from "react-highlight-words";
import React, {createContext, useContext} from "react";
import UserAvatar from "@/Components/UserAvatar.jsx";
import {isOnline} from "@/Helper/functions.js";
const MessageContext = createContext()
const Message = ({authId, message, keyword}) => {
    const isAuthUser = authId === message.user.id
    return (
        <MessageContext.Provider value={{message, keyword}}>
            {isAuthUser
                ? <MyMessage />
                : <OtherMessage />
            }
        </MessageContext.Provider>
    )
}
const MyMessage = () => {
    const {message, keyword} = useContext(MessageContext)
    return (
        <div className="message message-right">

            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex align-items-center justify-content-end">
                        <PopupMessage />
                        <div className="message-content bg-primary text-white">

                            <div>
                                <Highlighter
                                    highlightClassName="highlighted-text"
                                    searchWords={[keyword]}
                                    autoEscape={true}
                                    textToHighlight={message.content}
                                />
                            </div>

                            <div className="mt-1">
                                <small className="opacity-65">{message.sendTime.full}</small>
                            </div>
                            <div className="mt-1">
                                <small className="opacity-65">{message.id}</small>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
const OtherMessage = () => {
    const {message, keyword} = useContext(MessageContext)
    const other = message.user;
    return (
        <div className="message">
            <UserAvatar
                user={other}
                isOnline={isOnline(other.id)}
                showProfile={true}
                size="sm"
                className=" mr-4 mr-lg-5 "
            />
            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex align-items-center">

                        <div className="message-content bg-light">
                            <div>
                                <Highlighter
                                    highlightClassName="highlighted-text"
                                    searchWords={[keyword]}
                                    autoEscape={true}
                                    textToHighlight={message.content}
                                />
                            </div>

                            <div className="mt-1">
                                <small className="opacity-65">{message.sendTime.full}</small>
                            </div>
                        </div>
                        <PopupMessage/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Message;
