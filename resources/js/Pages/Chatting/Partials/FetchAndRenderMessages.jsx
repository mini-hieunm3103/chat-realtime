import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {useFetch} from "@/Helper/hooks.js";
import PopupMessage from "@/Pages/Chatting/Partials/PopupMessage.jsx";
import Highlighter from "react-highlight-words";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import LoadingDiv from "@/Components/LoadingDiv.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {isObjectEmpty} from "@/Helper/functions.js";

//NOTE: RESERVE RENDER

// groupMessages: "Consecutive messages are sent by the same person."
const configMessage = {
    messageMarginBottom: " mb-2",
    invisibleAvatar: <div className={"avatar avatar-sm mr-4 mr-lg-5 invisible"}></div>,
    groupMessages: {
        marginBottom: " mb-7",
        myMsg: {
            oneMsgInGroupBorderRadius: ".9rem .9rem .625rem .9rem",
            firstMsgBorderRadius: ".9rem .9rem 5px .9rem", // top-left top-right bt-right bt-left
            middleMsgBorderRadius: ".9rem 5px 5px .9rem",
            lastMsgBorderRadius: ".9rem 5px .625rem .9rem",
        },
        otherMsg: {
            oneMsgInGroupBorderRadius: ".9rem .9rem .9rem .625rem",
            firstMsgBorderRadius: ".9rem .9rem .9rem 5px", // top-left top-right bt-right bt-left
            middleMsgBorderRadius: "5px .9rem .9rem 5px",
            lastMsgBorderRadius: "5px .9rem .9rem 1px",
        }
    }
}

const MessageContext = createContext()

const FetchAndRenderMessages = ({channelId, searchMessageKeyword}) => {
    const {authLayoutData, allUserOnlineIds} = useContext(AuthenticatedContext);
    const lastMessage = useRef(null);
    const authUserId = authLayoutData.user.id;
    const [listMessages, setListMessages] = useState([])
    const [messagesPage, setMessagesPage] = useState(1)
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const {data: getMessages, isPending: loadMessages, error: errorMessages} = useFetch(route('message.getMessages', {channel_id: channelId, page: messagesPage}))
    useEffect(() => {
        if (getMessages.hasOwnProperty('data') && !loadMessages ) {
            setListMessages(getMessages.data)
        }
    }, [loadMessages]);
    useEffect(() => {
        if (!isObjectEmpty(getMessages)){
            setListMessages(prevUsers =>{
                return [...new Set([...prevUsers, ...getMessages.data])]
            })
            setHasMoreMessages(messagesPage <= getMessages.meta.last_page)
        }
    }, [getMessages]);
    const fetchMoreData = () => {
        setMessagesPage(prevState => prevState+1)
    }
    let isFirstMsgInGroupMessages, isLastMsgInGroupMessages;
    return (
        <>
            {loadMessages
                ? <LoadingDiv className={"h-100"}/>
                : <div
                    id="scrollableDiv"
                    className={"chat-content px-lg-8 py-lg-5"}
                    style={{
                        height: 300,
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                    }}
                >
                    {/*Put the scroll bar always on the bottom*/}
                    <InfiniteScroll
                        dataLength={listMessages.length}
                        next={fetchMoreData}
                        style={{
                            display: 'flex',
                            flexDirection: 'column-reverse'
                        }} //To put endMessage and loader to the top.
                        inverse={true} //
                        hasMore={hasMoreMessages}
                        loader={<LoadingDiv />}
                        scrollableTarget="scrollableDiv"
                        className={"hide-scrollbar"}
                    >
                        {
                            listMessages.length ? (
                                listMessages.map((message, i) => {
                                    if (i + 1 < listMessages.length) {
                                        isFirstMsgInGroupMessages = (listMessages[i].user_id !== listMessages[i + 1].user_id)
                                    } else {
                                        isFirstMsgInGroupMessages = false // first message in list
                                    }
                                    if (i - 1 >= 0) {
                                        isLastMsgInGroupMessages = (listMessages[i].user_id !== listMessages[i - 1].user_id)
                                    } else {
                                        isLastMsgInGroupMessages = true // last msg in list
                                    }
                                    return (
                                        <MessageContext.Provider value={{
                                            searchMessageKeyword,
                                            message,
                                            isFirstMsgInGroupMessages,
                                            isLastMsgInGroupMessages,
                                        }}>
                                            {(authUserId === message.user.id) ? <MyMessage/> : <OtherMessage/>}
                                        </MessageContext.Provider>
                                    )
                                })
                            ) : null
                        }
                        <div ref={lastMessage}></div>
                    </InfiniteScroll>
                </div>
            }
        </>
    )
}

const MyMessage = () => {
    const {
        searchMessageKeyword,
        message,
        isFirstMsgInGroupMessages,
        isLastMsgInGroupMessages
    } = useContext(MessageContext)
    let msgBorderRadius;
    if (isFirstMsgInGroupMessages && isLastMsgInGroupMessages) {
        msgBorderRadius = configMessage.groupMessages.myMsg.oneMsgInGroupBorderRadius
    } else if (isFirstMsgInGroupMessages) {
        msgBorderRadius = configMessage.groupMessages.myMsg.firstMsgBorderRadius
    } else if (isLastMsgInGroupMessages) {
        msgBorderRadius = configMessage.groupMessages.myMsg.lastMsgBorderRadius
    } else {
        msgBorderRadius = configMessage.groupMessages.myMsg.middleMsgBorderRadius
    }
    return (
        <div
            className={"message message-right " + configMessage.messageMarginBottom + (isLastMsgInGroupMessages ? configMessage.groupMessages.marginBottom : "")}>

            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex align-items-center justify-content-end">
                        <PopupMessage/>
                        <div className="message-content bg-primary text-white" style={{borderRadius: msgBorderRadius}}
                             title={message.sendTime.full}>
                            <div>
                                <Highlighter
                                    highlightClassName="highlighted-text"
                                    searchWords={[searchMessageKeyword]}
                                    autoEscape={true}
                                    textToHighlight={message.content}
                                />
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
const OtherMessage = () => {
    const {allUserOnlineIds} = useContext(AuthenticatedContext)
    const {
        searchMessageKeyword,
        message,
        isFirstMsgInGroupMessages,
        isLastMsgInGroupMessages
    } = useContext(MessageContext)
    const other = message.user;
    let msgBorderRadius;
    if (isFirstMsgInGroupMessages && isLastMsgInGroupMessages) {
        msgBorderRadius = configMessage.groupMessages.otherMsg.oneMsgInGroupBorderRadius
    } else if (isFirstMsgInGroupMessages) {
        msgBorderRadius = configMessage.groupMessages.otherMsg.firstMsgBorderRadius
    } else if (isLastMsgInGroupMessages) {
        msgBorderRadius = configMessage.groupMessages.otherMsg.lastMsgBorderRadius
    } else {
        msgBorderRadius = configMessage.groupMessages.otherMsg.middleMsgBorderRadius
    }
    return (
        <div
            className={"message " + configMessage.messageMarginBottom + (isLastMsgInGroupMessages ? configMessage.groupMessages.marginBottom : "")}>
            {isLastMsgInGroupMessages
                ? <UserAvatar
                    user={other}
                    isOnline={allUserOnlineIds.includes(other.id)}
                    showProfile={true}
                    size="sm"
                    className=" mr-4 mr-lg-5 "
                />
                : configMessage.invisibleAvatar
            }
            <div className="message-body">
                <div className="message-row">
                    <div className="d-flex flex-row align-items-center">
                        <div className="message-content bg-light position-relative" style={{borderRadius: msgBorderRadius}} title={message.sendTime.full}>
                            <div>
                                <Highlighter
                                    highlightClassName="highlighted-text"
                                    searchWords={[searchMessageKeyword]}
                                    autoEscape={true}
                                    textToHighlight={message.content}
                                />
                            </div>
                        </div>
                        <PopupMessage/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default React.memo(FetchAndRenderMessages)
