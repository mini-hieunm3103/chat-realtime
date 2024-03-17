import PopupMessage from "@/Pages/Chatting/Partials/PopupMessage.jsx";
import Highlighter from "react-highlight-words";
import React, {createContext, useContext} from "react";
import UserAvatar from "@/Components/UserAvatar.jsx";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
const MessageContext = createContext()
const Message = (
    {
        authId,
        message,
        keyword,
        hasAvatar = true,
        hasName = false, // false: direct message || true: group
        isLast =false,
        isFirst,
    }
) => {
    const isAuthUser = authId === message.user.id
    return (
        <MessageContext.Provider value={{message, keyword, hasAvatar, isLast, isFirst, hasName}}>
            {isAuthUser
                ? <MyMessage />
                : <OtherMessage />
            }
        </MessageContext.Provider>
    )
}
const MyMessage = () => {
    const {message, keyword, hasAvatar, isLast, isFirst} = useContext(MessageContext)
    return (
        <div className={"message message-right mt-2 " + ((hasAvatar && !isLast) ? "mb-10 " : "")}>

            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex align-items-center justify-content-end">
                        <PopupMessage/>
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
    const {message, keyword, hasAvatar, isLast, isFirst, hasName} = useContext(MessageContext)
    const {allUserOnlineIds} = useContext(AuthenticatedContext)
    const other = message.user;
    return (
        <div className={"message mt-2 " + ((hasAvatar && !isLast) ? "mb-10 " : "")}>
            {hasAvatar
                ? <UserAvatar
                    user={other}
                    isOnline={allUserOnlineIds.includes(other.id)}
                    showProfile={true}
                    size="sm"
                    className=" mr-4 mr-lg-5 "
                />
                : <div className={"avatar avatar-sm mr-4 mr-lg-5 invisible"}></div>
            }
            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex flex-row align-items-center">
                        <div className="message-content bg-light position-relative">
                            {(isFirst || hasName) &&
                                <div className="position-absolute p-0" style={{top: "-30px"}}>
                                    <h6 className="mb-2">{message.user.name}</h6>
                                </div>
                            }
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
