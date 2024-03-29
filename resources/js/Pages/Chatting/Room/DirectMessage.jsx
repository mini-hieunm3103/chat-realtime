import React, {useContext, useEffect, useState} from "react";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import IsTyping from "@/Pages/Chatting/Partials/IsTyping.jsx";
import Message from "@/Pages/Chatting/Partials/Message.jsx";
import ChatSidebar from "@/Pages/Chatting/Partials/DM/Chatsidebar.jsx";
import {useFetch, useOpen} from "@/Helper/hooks.js";
import LoadingModal from "@/Components/Modals/LoadingModal.jsx";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";

function DirectMessage({channelId, auth}){
    const {allUserOnlineIds} = useContext(AuthenticatedContext);
    const [searchMessage, setSearchMessage] = useState(null)
    const [listMessages, setListMessages] = useState([])
    const [other, setOther ] = useState(false)
    const {open: openChatSidebar, toggle:  toggleChatsidebar} = useOpen()
    const {data: getMessages, isPending: loadMessages, error: errorMessages} = useFetch(route('message.getMessages', {channel_id: channelId}))
    const {data: getChannelUsers, isPending: loadChannelUsers, error: errorChannelUsers} = useFetch(route('user.getUsersChannel', {channel_id: channelId}))

    useEffect(() => {
        if (getMessages.hasOwnProperty('data') && !loadMessages ) {
            setListMessages(getMessages.data)
        }
    }, [loadMessages]);
    useEffect(() => {
        if (getChannelUsers.hasOwnProperty('data') && !loadChannelUsers ) {
            const otherUser = getChannelUsers.data.find(user => user.id !== auth.id)
            setOther(otherUser)
        }
    }, [loadChannelUsers]);
    const {open: openLoadingModal, toggle: toggleLoadingModal} = useOpen(loadMessages || !other)
    let continuous
    return  (
        <>
            <LoadingModal isShowing={openLoadingModal} hide={toggleLoadingModal}/>
            <div id="chat-2" className="chat dropzone-form-js" data-dz-url="some.php">
                {

                    <div className="chat-body">
                        <div className="chat-header border-bottom py-4 py-lg-6 px-lg-8">
                            <div className="container-xxl">

                                <div className="row align-items-center">

                                    <div className="col-3 d-xl-none">
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                <a className="text-muted px-0" href="#" data-chat="open">
                                                    <i className="icon-md fe-chevron-left"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                <div className="col-6 col-xl-6">
                                    <div className="media text-center text-xl-left">
                                        <UserAvatar
                                            user={other}
                                            showProfile={true}
                                            isOnline={allUserOnlineIds.includes(other.id)}
                                            className=" d-none d-lg-inline-block mr-5 "
                                            size="sm"
                                        />
                                        { other && <div className="media-body align-self-center text-truncate">
                                            <h6 className="text-truncate mb-n1">{other.name}</h6>
                                            {allUserOnlineIds.includes(other.id) &&
                                                <span
                                                    className="badge badge-dot badge-success d-inline-block d-xl-none mr-1"></span>}
                                            <small
                                                className="text-muted">{(allUserOnlineIds.includes(other.id) ) ? "Online" : "Offline"}</small>
                                        </div>}
                                    </div>
                                </div>

                                    <div className="col-3 col-xl-6 text-right">
                                        <ul className="nav justify-content-end">
                                            <li className="nav-item list-inline-item d-none d-xl-block mr-3">
                                                <a className="nav-link text-muted px-3" data-toggle="collapse"
                                                   data-target="#chat-2-search" href="#" title="Search this chat">
                                                <i className="icon-md fe-search"></i>
                                                </a>
                                            </li>

                                            <li className="nav-item list-inline-item d-none d-xl-block mr-0">
                                                <div className="nav-link text-muted px-3" onClick={toggleChatsidebar}>
                                                    <i className="icon-md fe-more-vertical"></i>
                                                </div>
                                            </li>
                                            {/*Mobile*/}
                                            <li className="nav-item list-inline-item d-block d-xl-none">
                                                <div className="dropdown">
                                                    <a className="nav-link text-muted px-0" href="#"
                                                       data-toggle="dropdown"
                                                       aria-haspopup="true" aria-expanded="false">
                                                        <i className="icon-md fe-more-vertical"></i>
                                                    </a>
                                                    <div className="dropdown-menu">
                                                        <a className="dropdown-item d-flex align-items-center"
                                                           data-toggle="collapse" data-target="#chat-2-search" href="#">
                                                            Search <span className="ml-auto pl-5 fe-search"></span>
                                                        </a>
                                                        <div className="dropdown-item d-flex align-items-center"
                                                             onClick={toggleChatsidebar}>
                                                            Chat Info <span
                                                            className="ml-auto pl-5 fe-more-horizontal"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="collapse border-bottom px-lg-8" id="chat-2-search">
                            <div className="container-xxl py-4 py-lg-6">
                                <SearchInput
                                    keyword={searchMessage}
                                    setKeyword={setSearchMessage}
                                    placeHolder="Search this chat"
                                />
                            </div>
                        </div>

                        <div className="chat-content px-lg-8">
                            <div className="container-xxl py-6 py-lg-10">

                                <div className="message-divider my-9 mx-lg-5">
                                    <div className="row align-items-center">

                                        <div className="col">
                                            <hr/>
                                        </div>

                                        <div className="col-auto">
                                            <small className="text-muted">Today</small>
                                        </div>

                                        <div className="col">
                                            <hr/>
                                        </div>
                                    </div>
                                </div>
                                {
                                    listMessages.length ? (
                                        listMessages.map((message, i) => {
                                            if (i+1 < listMessages.length) {
                                                continuous = (listMessages[i].user_id === listMessages[i+1].user_id)
                                            } else {
                                                continuous = false
                                            }
                                            return (<Message authId={auth.id} message={message} keyword={searchMessage} hasAvatar={!continuous} isLast={i+1 === listMessages.length}/>)
                                        })
                                    ) : null
                                }
                            </div>

                            <div className="end-of-chat"></div>
                        </div>

                        <div className="chat-files hide-scrollbar px-lg-8">
                            <div className="container-xxl">
                                <div className="dropzone-previews-js form-row py-4"></div>
                            </div>
                        </div>

                        <div id="chat-id-2-form" className="chat-footer border-top py-4 py-lg-6 px-lg-8">
                            <div className="container-xxl">
                                <form action="assets/php/upload.php" data-emoji-form="">
                                    <div className="form-row align-items-center">
                                        <div className="col">
                                            <div className="input-group">

                                            <textarea id="chat-id-2-input"
                                                      className="form-control bg-transparent border-0"
                                                      placeholder="Type your message..." rows="1" data-emoji-input=""
                                                      data-autosize="true"></textarea>

                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
                                                        type="button" data-emoji-btn="">
                                                        <img src="" data-inject-svg="" alt=""/>
                                                    </button>
                                                </div>

                                                <div className="input-group-append">
                                                    <button id="chat-upload-btn-2"
                                                            className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js"
                                                            type="button">
                                                        <img src="" data-inject-svg="" alt=""/>
                                                    </button>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-auto">
                                            <button className="btn btn-ico btn-primary rounded-circle" type="submit">
                                                <span className="fe-send"></span>
                                            </button>
                                        </div>

                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                }
                {<ChatSidebar other={other} open={openChatSidebar} toggleOpen={toggleChatsidebar}/>}
            </div>
        </>

    )

}

export default React.memo(DirectMessage);
