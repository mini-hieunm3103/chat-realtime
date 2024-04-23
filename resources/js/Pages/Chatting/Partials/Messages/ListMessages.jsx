import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {useFetch} from "@/Helper/hooks.js";
import Highlighter from "react-highlight-words";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import LoadingDiv from "@/Components/LoadingDiv.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {isObjectEmpty} from "@/Helper/functions.js";
import TextMessagePopup from "@/Pages/Chatting/Partials/Messages/Popup/TextMessagePopup.jsx";
import MessageContext from "@/Pages/Chatting/Partials/Messages/Message/MessageContext.jsx";
import LeftMessage from "@/Pages/Chatting/Partials/Messages/Message/LeftMessage.jsx"
import RightMessage from "@/Pages/Chatting/Partials/Messages/Message/RightMessage.jsx"
import RecallMessageForm from "@/Pages/Chatting/Partials/RecallMessageForm.jsx";
//NOTE: RESERVE RENDER

// groupMessages: "Consecutive messages are sent by the same person."

const ListMessages = ({channelId, searchMessageKeyword}) => {
    const {authLayoutData} = useContext(AuthenticatedContext);
    const lastMessage = useRef(null);
    const authUserId = authLayoutData.user.id;
    const [listMessages, setListMessages] = useState([])
    const [messagesPage, setMessagesPage] = useState(1)
    const [recallMessageId, setRecallMessageId] = useState(0)
    const [isRecallSuccessfully, setIsRecallSuccessfully] = useState(false)
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const {data: getMessages, isPending: loadMessages, error: errorMessages} = useFetch(route('message.getMessages', {channel_id: channelId, page: messagesPage}))
    useEffect(() => {
        Echo.private(`chat.${channelId}`)
            .listen('MessagePosted', (data)=> {
                const newMessage = data.message
                console.log(data);
                setListMessages((prevState)=> [newMessage, ...prevState])
            })
            .error((err)=> {console.log(err)})
        return ()=> {
            Echo.leave(`private-chat.${channelId}`)
        }
    }, [channelId]);
    useEffect(() => {
        if (getMessages.hasOwnProperty('data') && !loadMessages ) {
            setListMessages(getMessages.data)
        }
    }, [loadMessages]);
    useEffect(() => {
        if (!isObjectEmpty(getMessages)){
            setListMessages(prevMessages =>{
                return [...new Set([...prevMessages, ...getMessages.data])]
            })
            setHasMoreMessages(messagesPage <= getMessages.meta.last_page)
        }
    }, [getMessages]);
    useEffect(() => {
        if (isRecallSuccessfully) {
            const updateListMessagesAfterRecall = listMessages.map((message)=> {
                if (message.message_id === recallMessageId) {
                    // reset recall
                    setRecallMessageId(0)
                    setIsRecallSuccessfully(false)
                    // update
                    return {...message, is_recalled: 1}
                } else
                    return message
            })
            setListMessages(updateListMessagesAfterRecall)
        }
    }, [isRecallSuccessfully]);
    const fetchMoreData = () => {
        setMessagesPage(prevState => prevState+1)
    }
    let isFirstMsgInGroupMessages, isLastMsgInGroupMessages;
    return (
        <>
            {loadMessages
                ? <LoadingDiv className={"h-100"}/>
                :
                <>
                    <div
                        id="scrollableDiv"
                        className={"chat-content px-lg-8 py-lg-5 px-5"}
                        style={{
                            height: 300,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={listMessages.length}
                            next={fetchMoreData}
                            style={{
                                display: 'flex',
                                flexDirection: 'column-reverse'
                            }}
                            inverse={true} //
                            hasMore={hasMoreMessages}
                            loader={<LoadingDiv/>}
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
                                                setRecallMessageId,
                                            }}>
                                                {(authUserId === message.user.id) ? <RightMessage/> : <LeftMessage/>}
                                            </MessageContext.Provider>
                                        )
                                    })
                                ) : null
                            }
                            <div ref={lastMessage}></div>
                        </InfiniteScroll>
                    </div>
                    <RecallMessageForm setIsRecallSuccessfully={setIsRecallSuccessfully} recallMessageId={recallMessageId} setRecallMessageId={setRecallMessageId}/>
                </>
            }
        </>
    )
}

export default React.memo(ListMessages)
