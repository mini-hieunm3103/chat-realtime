import CollapseButton from "@/Components/CollapseButton.jsx";
import React, {useEffect, useState} from "react";
import {useFetch, useOpen} from "@/Helper/hooks.js";
import {router} from "@inertiajs/react";
import {asset, convertBaseJs} from "@/Helper/functions.js";
import {data} from "autoprefixer";
import GroupAvatar from "@/Components/GroupAvatar.jsx";
import LoadingModal from "@/Components/Modals/LoadingModal.jsx";
import Message from "@/Pages/Chatting/Partials/Message.jsx";
import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";
import Dropdown from "@/Components/Dropdown/Dropdown.jsx";
import GalleryCS from "@/Pages/Chatting/Partials/DM/ChildrenCS/GalleryCS.jsx";
import FilesCS from "@/Pages/Chatting/Partials/DM/ChildrenCS/FilesCS.jsx";
import LinkCS from "@/Pages/Chatting/Partials/DM/ChildrenCS/LinkCS.jsx";
export default function Group({ auth ,channelId}){
    const trueUrl = convertBaseJs(window.location.pathname.match(/\d+/)[0], 10, 37)
    const groupId = trueUrl.match(/\d+/)[0]
    const [searchMessage, setSearchMessage] = useState(null)
    const [listMessages, setListMessages] = useState([])
    const [groupDetail, setGroupDetail] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const {open: openChatSidebar, toggle:  toggleChatsidebar} = useOpen()
    const {data: getMessages, isPending: loadMessages, error: errorMessages} = useFetch(route('message.getMessages', {channel_id: channelId, page:1}))
    const {data: getGroupDetail, isPending: loadGroupDetail, error: errorGroupDetail} = useFetch(route('group.detail', {group_id: groupId}))
    const {data: getChannelUsers, isPending: loadChannelUsers, error: errorChannelUsers} = useFetch(route('user.getUsersChannel', {channel_id: channelId}))
    useEffect(() => {
        if (getMessages.hasOwnProperty('data') && !loadMessages) {
            setListMessages(getMessages.data)
        }
    }, [loadMessages]);
    useEffect(() => {
        if (getGroupDetail.hasOwnProperty('data') && !loadGroupDetail) {
            setGroupDetail(getGroupDetail.data)
        }
    }, [loadGroupDetail]);
    useEffect(() => {
        if (getChannelUsers.hasOwnProperty('data') && !loadChannelUsers) {
            setListUsers(getChannelUsers.data)
        }
    }, [loadChannelUsers]);
    const {open: openLoadingModal, toggle: toggleLoadingModal} = useOpen(loadMessages || !groupDetail || !listUsers.length > 0)
    let continuous;
    let next;
    return (
        <>
            <LoadingModal isShowing={openLoadingModal} hide={toggleLoadingModal}/>
            <div id="chat-1" className="chat dropzone-form-js" data-dz-url="some.php">

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
                                        <GroupAvatar
                                            className=" d-none d-xl-inline-block mr-5"
                                            size="sm"
                                            name="Global Chat Admin"
                                        />

                                        {groupDetail && listUsers.length > 0 &&
                                            <div className="media-body align-self-center text-truncate">
                                                <h6 className="text-truncate mb-n1">{groupDetail.name}</h6>
                                                <small className="text-muted">{listUsers.length} members</small>
                                                {
                                                    groupDetail.topic
                                                    && <>
                                                        <small className="text-muted mx-2"> • </small>
                                                        <small className="text-muted">{groupDetail.topic}</small>
                                                    </>
                                                }

                                            </div>}
                                    </div>
                                </div>

                                <div className="col-3 col-xl-6 text-right">
                                    <ul className="nav justify-content-end">
                                        <li className="nav-item list-inline-item d-none d-xl-block mr-5">
                                            <a className="nav-link text-muted px-3" data-toggle="collapse"
                                               data-target="#chat-1-search" href="#" title="Search this chat">
                                                <i className="icon-md fe-search"></i>
                                            </a>
                                        </li>

                                        <li className="nav-item list-inline-item d-none d-xl-block mr-3">
                                            <a className="nav-link text-muted px-3" href="#"
                                               data-chat-sidebar-toggle="#chat-1-members" title="Add People">
                                                <i className="icon-md fe-user-plus"></i>
                                            </a>
                                        </li>

                                        <li className="nav-item list-inline-item d-none d-xl-block mr-0">
                                            <div className="nav-link text-muted px-3" onClick={toggleChatsidebar}>
                                                <i className="icon-md fe-more-vertical"></i>
                                            </div>
                                        </li>

                                        <li className="nav-item list-inline-item d-block d-xl-none">
                                            <div className="dropdown">
                                                <a className="nav-link text-muted px-0" href="#"
                                                   data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">
                                                    <i className="icon-md fe-more-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item d-flex align-items-center"
                                                       data-toggle="collapse" data-target="#chat-1-search"
                                                       href="#">
                                                        Search <span className="ml-auto pl-5 fe-search"></span>
                                                    </a>

                                                    <a className="dropdown-item d-flex align-items-center"
                                                       href="#" data-chat-sidebar-toggle="#chat-1-info">
                                                        Chat Info <span
                                                        className="ml-auto pl-5 fe-more-horizontal"></span>
                                                    </a>
                                                    <a className="dropdown-item d-flex align-items-center" href="#"
                                                       data-chat-sidebar-toggle="#chat-1-members">
                                                        Add Members <span className="ml-auto pl-5 fe-user-plus"></span>
                                                    </a>
                                                    <CollapseButton

                                                    >
                                                        Add Members
                                                        <span className="ml-auto pl-5 fe-user-plus"></span>
                                                    </CollapseButton>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="collapse border-bottom px-lg-8" id="chat-1-search">
                        <div className="container-xxl py-4 py-lg-6">

                            <div className="input-group">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Search this chat" aria-label="Search this chat"/>

                                <div className="input-group-append">
                                    <button className="btn btn-lg btn-ico btn-secondary btn-minimal"
                                            type="submit">
                                        <i className="fe-search"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="chat-content px-lg-8">
                        <div className="container-xxl py-6 py-lg-10">

                            {
                                listMessages.length && (
                                    listMessages.map((message, i) => {
                                        const hasName = next===i
                                        // continous: liền kề -> tạo 1 group message và chỉ hiện 1 lần avatar ở message cuối cùng group đó
                                        // next: cũng với group đó thì message đầu tiên sẽ render ra name
                                        if (i+1 < listMessages.length) {
                                            continuous = (listMessages[i].user_id === listMessages[i+1].user_id)
                                        } else {
                                            continuous = false
                                        }
                                        if (!continuous) {
                                            next = i+1
                                        }
                                        return (<Message authId={auth.id} message={message} keyword={searchMessage} hasName={hasName} hasAvatar={!continuous} isFirst={i===0} isLast={i+1 === listMessages.length}/>)
                                    })
                                )
                            }

                        </div>

                        <div className="end-of-chat"></div>
                    </div>

                    <div className="chat-files hide-scrollbar px-lg-8">
                        <div className="container-xxl">
                            <div className="dropzone-previews-js form-row py-4"></div>
                        </div>
                    </div>

                    <div className="chat-footer border-top py-4 py-lg-6 px-lg-8">
                        <div className="container-xxl">

                            <form id="chat-id-1-form" action="" data-emoji-form="">
                                <div className="form-row align-items-center">
                                    <div className="col">
                                        <div className="input-group">

                                                    <textarea id="chat-id-1-input"
                                                              className="form-control bg-transparent border-0"
                                                              placeholder="Type your message..." rows="1"
                                                              data-emoji-input="" data-autosize="true"></textarea>

                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
                                                    type="button" data-emoji-btn="">
                                                    <img src="" data-inject-svg=""
                                                         alt=""/>
                                                </button>
                                            </div>

                                            <div className="input-group-append">
                                                <button id="chat-upload-btn-1"
                                                        className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js"
                                                        type="button">
                                                    <img src="" data-inject-svg=""
                                                         alt=""/>
                                                </button>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-auto">
                                        <button className="btn btn-ico btn-primary rounded-circle"
                                                type="submit">
                                            <span className="fe-send"></span>
                                        </button>
                                    </div>

                                </div>

                            </form>

                        </div>
                    </div>
                </div>

                <div id="chat-1-info" className="chat-sidebar">
                    <div className="d-flex h-100 flex-column">

                        <div className="border-bottom py-4 py-lg-6">
                            <div className="container-fluid">

                                <ul className="nav justify-content-between align-items-center">
                                    <li className="nav-item list-inline-item">
                                        <a className="nav-link text-muted px-0" href="#"
                                           data-chat-sidebar-close="">
                                            <i className="icon-md fe-chevron-left"></i>
                                        </a>
                                    </li>

                                    <li className="text-center d-block d-lg-none">
                                        <h6 className="mb-n2">Bootstrap Themes</h6>
                                        <small className="text-muted">Chat Details</small>
                                    </li>

                                    <li className="nav-item list-inline-item">
                                        <div className="dropdown">
                                            <a className="nav-link text-muted px-0" href="#"
                                               data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                <i className="icon-md fe-sliders"></i>
                                            </a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    Mute
                                                    <span className="ml-auto fe-bell"></span>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    Delete
                                                    <span className="ml-auto fe-trash-2"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="hide-scrollbar flex-fill">

                            <div className="border-bottom text-center py-9 px-10">
                                <div className="avatar avatar-xl mx-5 mb-5">
                                    <img className="avatar-img" src="" alt=""/>
                                </div>
                                <h5>Bootstrap Themes</h5>
                                <p className="text-muted">Bootstrap is an open source toolkit for developing web
                                    with HTML, CSS, and JS.</p>
                            </div>

                            <ul className="nav nav-tabs nav-justified bg-light rounded-0" role="tablist">
                                <li className="nav-item">
                                    <a href="#chat-id-1-members" className="nav-link active" data-toggle="tab"
                                       role="tab" aria-selected="true">Members</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#chat-id-1-files" className="nav-link" data-toggle="tab"
                                       role="tab">Files</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div id="chat-id-1-members" className="tab-pane fade show active">
                                    <ul className="list-group list-group-flush list-group-no-border-first">
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm avatar-online mr-5">
                                                    <img className="avatar-img"
                                                         src="" alt="Anna Bridges"/>
                                                </div>


                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">Anna Bridges</a>
                                                    </h6>
                                                    <small className="text-muted">Online</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm avatar-online mr-5">
                                                    <img className="avatar-img"
                                                         src="" alt="Simon Hensley"/>
                                                </div>


                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">Simon Hensley</a>
                                                    </h6>
                                                    <small className="text-muted">Online</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm mr-5">
                                                    <img className="avatar-img"
                                                         src=""
                                                         alt="William Wright"/>
                                                </div>

                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">William Wright</a>
                                                    </h6>
                                                    <small className="text-muted">last seen 7 hours ago</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm mr-5">
                                                    <img className="avatar-img"
                                                         src="" alt="Leslie Sutton"/>
                                                </div>

                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">Leslie Sutton</a>
                                                    </h6>
                                                    <small className="text-muted">last seen 6 days ago</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm mr-5">
                                                    <img className="avatar-img"
                                                         src=""
                                                         alt="Matthew Wiggins"/>
                                                </div>

                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">Matthew Wiggins</a>
                                                    </h6>
                                                    <small className="text-muted">last seen 2 days ago</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm mr-5">
                                                    <img className="avatar-img"
                                                         src="" alt="Thomas Walker"/>
                                                </div>

                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">Thomas Walker</a>
                                                    </h6>
                                                    <small className="text-muted">last seen 10 minutes
                                                        ago</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm mr-5">
                                                    <img className="avatar-img"
                                                         src="" alt="Zane Mayes"/>
                                                </div>

                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">Zane Mayes</a>
                                                    </h6>
                                                    <small className="text-muted">last seen 6 days ago</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm mr-5">
                                                    <img className="avatar-img"
                                                         src="" alt="Brian Dawson"/>
                                                </div>

                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">Brian Dawson</a>
                                                    </h6>
                                                    <small className="text-muted">last seen 2 days ago</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li className="list-group-item py-6">
                                            <div className="media align-items-center">


                                                <div className="avatar avatar-sm mr-5">
                                                    <img className="avatar-img"
                                                         src="" alt="William Greer"/>
                                                </div>

                                                <div className="media-body">
                                                    <h6 className="mb-0">
                                                        <a href="#" className="text-reset">William Greer</a>
                                                    </h6>
                                                    <small className="text-muted">last seen 10 minutes
                                                        ago</small>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Promote <span
                                                                className="ml-auto fe-trending-up"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Restrict <span
                                                                className="ml-auto fe-trending-down"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-user-x"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>

                                    </ul>
                                </div>

                                <div id="chat-id-1-files" className="tab-pane fade">
                                    <ul className="list-group list-group-flush list-group-no-border-first">
                                        <li className="list-group-item py-6">
                                            <div className="media">

                                                <div className="icon-shape bg-primary text-white mr-5">
                                                    <i className="fe-paperclip"></i>
                                                </div>

                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0">
                                                        <a href="#" className="text-reset"
                                                           title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>
                                                    </h6>

                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item">
                                                            <span className="text-muted">79.2 KB</span>
                                                        </li>
                                                        <li className="list-inline-item">
                                                                    <span
                                                                        className="text-muted text-uppercase">txt</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Download <span
                                                                className="ml-auto fe-download"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Share <span
                                                                className="ml-auto fe-share-2"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-trash-2"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>

                                        <li className="list-group-item py-6">
                                            <div className="media">

                                                <div className="icon-shape bg-primary text-white mr-5">
                                                    <i className="fe-paperclip"></i>
                                                </div>

                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0">
                                                        <a href="#" className="text-reset"
                                                           title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>
                                                    </h6>

                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item">
                                                            <span className="text-muted">79.2 KB</span>
                                                        </li>
                                                        <li className="list-inline-item">
                                                                    <span
                                                                        className="text-muted text-uppercase">psd</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Download <span
                                                                className="ml-auto fe-download"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Share <span
                                                                className="ml-auto fe-share-2"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-trash-2"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>

                                        <li className="list-group-item py-6">
                                            <div className="media">

                                                <div className="icon-shape bg-primary text-white mr-5">
                                                    <i className="fe-paperclip"></i>
                                                </div>

                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0">
                                                        <a href="#" className="text-reset"
                                                           title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>
                                                    </h6>

                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item">
                                                            <span className="text-muted">79.2 KB</span>
                                                        </li>
                                                        <li className="list-inline-item">
                                                                    <span
                                                                        className="text-muted text-uppercase">pdf</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Download <span
                                                                className="ml-auto fe-download"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Share <span
                                                                className="ml-auto fe-share-2"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-trash-2"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>

                                        <li className="list-group-item py-6">
                                            <div className="media">

                                                <div className="icon-shape bg-primary text-white mr-5">
                                                    <i className="fe-paperclip"></i>
                                                </div>

                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0">
                                                        <a href="#" className="text-reset"
                                                           title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>
                                                    </h6>

                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item">
                                                            <span className="text-muted">79.2 KB</span>
                                                        </li>
                                                        <li className="list-inline-item">
                                                                    <span
                                                                        className="text-muted text-uppercase">txt</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Download <span
                                                                className="ml-auto fe-download"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Share <span
                                                                className="ml-auto fe-share-2"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-trash-2"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>

                                        <li className="list-group-item py-6">
                                            <div className="media">

                                                <div className="icon-shape bg-primary text-white mr-5">
                                                    <i className="fe-paperclip"></i>
                                                </div>

                                                <div className="media-body align-self-center overflow-hidden">
                                                    <h6 className="text-truncate mb-0">
                                                        <a href="#" className="text-reset"
                                                           title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>
                                                    </h6>

                                                    <ul className="list-inline small mb-0">
                                                        <li className="list-inline-item">
                                                            <span className="text-muted">79.2 KB</span>
                                                        </li>
                                                        <li className="list-inline-item">
                                                                    <span
                                                                        className="text-muted text-uppercase">pdf</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="align-self-center ml-5">
                                                    <div className="dropdown">
                                                        <a href="#"
                                                           className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                           data-toggle="dropdown" aria-haspopup="true"
                                                           aria-expanded="false">
                                                            <i className="fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Download <span
                                                                className="ml-auto fe-download"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Share <span
                                                                className="ml-auto fe-share-2"></span>
                                                            </a>
                                                            <a className="dropdown-item d-flex align-items-center"
                                                               href="#">
                                                                Delete <span
                                                                className="ml-auto fe-trash-2"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="chat-1-members" className="chat-sidebar">
                    <div className="d-flex h-100 flex-column">

                        <div className="border-bottom py-4 py-lg-6">
                            <div className="container-fluid">

                                <ul className="nav justify-content-between align-items-center">
                                    <li className="nav-item">
                                        <a className="nav-link text-muted px-0" href="#"
                                           data-chat-sidebar-close="">
                                            <i className="icon-md fe-chevron-left"></i>
                                        </a>
                                    </li>

                                    <li className="text-center d-block d-lg-none">
                                        <h6 className="mb-n2">Bootstrap Themes</h6>
                                        <small className="text-muted">Add Members</small>
                                    </li>

                                    <li className="nav-item">
                                        <div className="dropdown">
                                            <a className="nav-link text-muted px-0" href="#"
                                               data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                <i className="icon-md fe-sliders"></i>
                                            </a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    Mute
                                                    <span className="ml-auto fe-bell"></span>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    Delete
                                                    <span className="ml-auto fe-trash-2"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="hide-scrollbar flex-fill">
                            <div className="border-bottom py-7">
                                <div className="container-fluid">

                                    <form action="#">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg"
                                                   placeholder="Search for users..."
                                                   aria-label="Search users..."/>
                                            <div className="input-group-append">
                                                <button className="btn btn-lg btn-ico btn-secondary btn-minimal"
                                                        type="submit">
                                                    <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>

                            <form action="#">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item py-4">
                                        <small className="text-uppercase">A</small>
                                    </li>

                                    <li className="list-group-item py-6">
                                        <div className="media align-items-center">


                                            <div className="avatar avatar-sm avatar-online mr-5">
                                                <img className="avatar-img" src=""
                                                     alt="Anna Bridges"/>
                                            </div>


                                            <div className="media-body">
                                                <h6 className="mb-0">Anna Bridges</h6>
                                                <small className="text-muted">Online</small>
                                            </div>

                                            <div className="align-self-center ml-auto">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input"
                                                           id="id-add-user-chat-1-user-1" type="checkbox"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="id-add-user-chat-1-user-1"></label>
                                                </div>
                                            </div>

                                        </div>

                                        <label className="stretched-label"
                                               htmlFor="id-add-user-chat-1-user-1"></label>
                                    </li>


                                    <li className="list-group-item py-4">
                                        <small className="text-uppercase">B</small>
                                    </li>

                                    <li className="list-group-item py-6">
                                        <div className="media align-items-center">


                                            <div className="avatar avatar-sm mr-5">
                                                <img className="avatar-img" src=""
                                                     alt="Brian Dawson"/>
                                            </div>

                                            <div className="media-body">
                                                <h6 className="mb-0">Brian Dawson</h6>
                                                <small className="text-muted">last seen 2 hours ago</small>
                                            </div>

                                            <div className="align-self-center ml-auto">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input"
                                                           id="id-add-user-chat-1-user-2" type="checkbox"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="id-add-user-chat-1-user-2"></label>
                                                </div>
                                            </div>

                                        </div>

                                        <label className="stretched-label"
                                               htmlFor="id-add-user-chat-1-user-2"></label>
                                    </li>


                                    <li className="list-group-item py-4">
                                        <small className="text-uppercase">L</small>
                                    </li>

                                    <li className="list-group-item py-6">
                                        <div className="media align-items-center">


                                            <div className="avatar avatar-sm mr-5">
                                                <img className="avatar-img" src=""
                                                     alt="Leslie Sutton"/>
                                            </div>

                                            <div className="media-body">
                                                <h6 className="mb-0">Leslie Sutton</h6>
                                                <small className="text-muted">last seen 3 days ago</small>
                                            </div>

                                            <div className="align-self-center ml-auto">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input"
                                                           id="id-add-user-chat-1-user-3" type="checkbox"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="id-add-user-chat-1-user-3"></label>
                                                </div>
                                            </div>

                                        </div>

                                        <label className="stretched-label"
                                               htmlFor="id-add-user-chat-1-user-3"></label>
                                    </li>


                                    <li className="list-group-item py-4">
                                        <small className="text-uppercase">M</small>
                                    </li>

                                    <li className="list-group-item py-6">
                                        <div className="media align-items-center">


                                            <div className="avatar avatar-sm mr-5">
                                                <img className="avatar-img" src=""
                                                     alt="Matthew Wiggins"/>
                                            </div>

                                            <div className="media-body">
                                                <h6 className="mb-0">Matthew Wiggins</h6>
                                                <small className="text-muted">last seen 3 days ago</small>
                                            </div>

                                            <div className="align-self-center ml-auto">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input"
                                                           id="id-add-user-chat-1-user-4" type="checkbox"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="id-add-user-chat-1-user-4"></label>
                                                </div>
                                            </div>

                                        </div>

                                        <label className="stretched-label"
                                               htmlFor="id-add-user-chat-1-user-4"></label>
                                    </li>


                                    <li className="list-group-item py-4">
                                        <small className="text-uppercase">S</small>
                                    </li>

                                    <li className="list-group-item py-6">
                                        <div className="media align-items-center">


                                            <div className="avatar avatar-sm mr-5">
                                                <img className="avatar-img" src=""
                                                     alt="Simon Hensley"/>
                                            </div>

                                            <div className="media-body">
                                                <h6 className="mb-0">Simon Hensley</h6>
                                                <small className="text-muted">last seen 3 days ago</small>
                                            </div>

                                            <div className="align-self-center ml-auto">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input"
                                                           id="id-add-user-chat-1-user-5" type="checkbox"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="id-add-user-chat-1-user-5"></label>
                                                </div>
                                            </div>

                                        </div>

                                        <label className="stretched-label"
                                               htmlFor="id-add-user-chat-1-user-5"></label>
                                    </li>


                                    <li className="list-group-item py-4">
                                        <small className="text-uppercase">W</small>
                                    </li>

                                    <li className="list-group-item py-6">
                                        <div className="media align-items-center">


                                            <div className="avatar avatar-sm mr-5">
                                                <img className="avatar-img" src=""
                                                     alt="William Wright"/>
                                            </div>

                                            <div className="media-body">
                                                <h6 className="mb-0">William Wright</h6>
                                                <small className="text-muted">last seen 3 days ago</small>
                                            </div>

                                            <div className="align-self-center ml-auto">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input"
                                                           id="id-add-user-chat-1-user-6" type="checkbox"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="id-add-user-chat-1-user-6"></label>
                                                </div>
                                            </div>

                                        </div>

                                        <label className="stretched-label"
                                               htmlFor="id-add-user-chat-1-user-6"></label>
                                    </li>
                                    <li className="list-group-item py-6">
                                        <div className="media align-items-center">


                                            <div className="avatar avatar-sm mr-5">
                                                <img className="avatar-img" src=""
                                                     alt="William Greer"/>
                                            </div>

                                            <div className="media-body">
                                                <h6 className="mb-0">William Greer</h6>
                                                <small className="text-muted">last seen 10 minutes ago</small>
                                            </div>

                                            <div className="align-self-center ml-auto">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input"
                                                           id="id-add-user-chat-1-user-7" type="checkbox"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="id-add-user-chat-1-user-7"></label>
                                                </div>
                                            </div>

                                        </div>

                                        <label className="stretched-label"
                                               htmlFor="id-add-user-chat-1-user-7"></label>
                                    </li>


                                    <li className="list-group-item py-4">
                                        <small className="text-uppercase">Z</small>
                                    </li>

                                    <li className="list-group-item py-6">
                                        <div className="media align-items-center">


                                            <div className="avatar avatar-sm mr-5">
                                                <img className="avatar-img" src=""
                                                     alt="Zane Mayes"/>
                                            </div>

                                            <div className="media-body">
                                                <h6 className="mb-0">Zane Mayes</h6>
                                                <small className="text-muted">last seen 3 days ago</small>
                                            </div>

                                            <div className="align-self-center ml-auto">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input"
                                                           id="id-add-user-chat-1-user-8" type="checkbox"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="id-add-user-chat-1-user-8"></label>
                                                </div>
                                            </div>

                                        </div>

                                        <label className="stretched-label"
                                               htmlFor="id-add-user-chat-1-user-8"></label>
                                    </li>

                                </ul>
                            </form>
                        </div>

                        <div className="border-top py-7">
                            <div className="container-fluid">
                                <button className="btn btn-lg btn-block btn-primary d-flex align-items-center"
                                        type="submit">
                                    Add members
                                    <span className="fe-user-plus ml-auto"></span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="chat-1-user-profile" className="chat-sidebar">
                    <div className="d-flex h-100 flex-column">

                        <div className="border-bottom py-4 py-lg-6">
                            <div className="container-fluid">

                                <ul className="nav justify-content-between align-items-center">
                                    <li className="nav-item list-inline-item">
                                        <a className="nav-link text-muted px-0" href="#"
                                           data-chat-sidebar-close="">
                                            <i className="icon-md fe-chevron-left"></i>
                                        </a>
                                    </li>

                                    <li className="text-center d-block d-lg-none">
                                        <h6 className="mb-n2">William Wright</h6>
                                        <small className="text-muted">User Details</small>
                                    </li>

                                    <li className="nav-item list-inline-item">
                                        <div className="dropdown">
                                            <a className="nav-link text-muted px-0" href="#"
                                               data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                <i className="icon-md fe-sliders"></i>
                                            </a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    Mute <span className="ml-auto fe-bell"></span>
                                                </a>
                                                <a className="dropdown-item d-flex align-items-center" href="#">
                                                    Delete <span className="ml-auto fe-trash-2"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="hide-scrollbar flex-fill">

                            <div className="border-bottom text-center py-9 px-10">
                                <div className="avatar avatar-xl mx-5 mb-5">
                                    <img className="avatar-img" src="" alt=""/>
                                    <div
                                        className="badge badge-sm badge-pill badge-primary badge-border-basic badge-top-right">
                                        <span className="text-uppercase">Pro</span>
                                    </div>
                                </div>
                                <h5>William Wright</h5>
                                <p className="text-muted">Bootstrap is an open source toolkit for developing web
                                    with HTML, CSS, and JS.</p>
                            </div>

                            <ul className="list-group list-group-flush mb-8">
                                <li className="list-group-item py-6">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Country</p>
                                            <p>Warsaw, Poland</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-globe"></i>
                                    </div>
                                </li>

                                <li className="list-group-item py-6">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Phone</p>
                                            <p>+39 02 87 21 43 19</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-mic"></i>
                                    </div>
                                </li>

                                <li className="list-group-item py-6">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Email</p>
                                            <p>anna@gmail.com</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-mail"></i>
                                    </div>
                                </li>

                                <li className="list-group-item py-6">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="small text-muted mb-0">Time</p>
                                            <p>10:03 am</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-clock"></i>
                                    </div>
                                </li>
                            </ul>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-6">
                                    <a href="#" className="media text-muted">
                                        <div className="media-body align-self-center">
                                            Twitter
                                        </div>
                                        <i className="icon-sm fe-twitter"></i>
                                    </a>
                                </li>

                                <li className="list-group-item py-6">
                                    <a href="#" className="media text-muted">
                                        <div className="media-body align-self-center">
                                            Facebook
                                        </div>
                                        <i className="icon-sm fe-facebook"></i>
                                    </a>
                                </li>

                                <li className="list-group-item py-6">
                                    <a href="#" className="media text-muted">
                                        <div className="media-body align-self-center">
                                            Github
                                        </div>
                                        <i className="icon-sm fe-github"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="border-top py-7">
                            <div className="container-fluid">
                                <button className="btn btn-lg btn-block btn-primary d-flex align-items-center"
                                        type="submit">
                                    Add friend
                                    <span className="fe-user-plus ml-auto"></span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                {<ChatSidebar groupDetail = {groupDetail} users={listUsers} open={openChatSidebar} toggleOpen={toggleChatsidebar}/>}
            </div>
        </>

    )
}
const ChatSidebar = ({users, open, toggleOpen, groupDetail}) => {
    if(users.length === 0 || !groupDetail) {
        return null
    }
    return (
        <BaseChatSidebar isOpenCS={open} hide={toggleOpen}>
            <BaseChatSidebar.MainCS chatSidebarId="chat-info">
                <BaseChatSidebar.Header>
                    <ul className="nav justify-content-between align-items-center">
                        <li className="nav-item list-inline-item d-lg-none ">
                            <div className="nav-link text-muted px-0" onClick={toggleOpen}>
                                <i className="icon-md fe-chevron-left"></i>
                            </div>
                        </li>
                    </ul>
                </BaseChatSidebar.Header>
                <BaseChatSidebar.Body>
                    <div className="container-fluid p-0">
                        <div className="card mb-3 ml-0 border-0 rounded-0">
                            <div className="text-center pb-9 pt-0 px-10">
                                <GroupAvatar
                                    name={groupDetail.name}
                                    size="xl"
                                    className=" mx-5 mb-5"
                                />
                                <h5>{groupDetail.name}</h5>

                                <p className="text-muted">{groupDetail.description}</p>
                            </div>
                        </div>

                        <div className="card mb-3 ml-0 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <div className="media-body">
                                            <p className=" h5 small text-muted mb-0">Turn Off
                                                Notifications</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-bell"></i>
                                    </div>
                                </li>

                                <li className="list-group-item py-2">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <div className="media-body">
                                            <p className=" h5 small text-muted mb-0">Turn Off
                                                Notifications</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-bell"></i>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <div className="media-body">
                                            <p className=" h5 small text-muted mb-0">Same Group: </p>
                                        </div>
                                        <i className="text-muted icon-sm fe-users"></i>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <div className="media-body">
                                            <p className=" h5 small text-muted mb-0">Turn Off
                                                Notifications</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-bell"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/*Gallery*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open targetId="user-social">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center" style={{height: 45}}>
                                                <div className="media-body">
                                                    <p className=" h5 small text-muted mb-0"
                                                       style={{fontWeight: "bold"}}>Pictures/Videos</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-chevron-down"></i>
                                            </div>
                                        </li>
                                    </Dropdown.Open>
                                    <Dropdown.Content>
                                        <ul className="list-group list-group-flush">
                                            <div className="d-flex flex-wrap justify-content-around">
                                                <div className="media-store">
                                                    <div className="px-3 py-3">
                                                        <img style={{height: 70, width: 70}}
                                                             loading="lazy"
                                                             src={asset("images/neom-brFQojtwSzE-unsplash.jpg")}
                                                             alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                            <BaseChatSidebar.TriggerChildrenCS
                                                childrenCSId="render-img"
                                                className="nav nav-pills nav-justified bg-light border-0 rounded-0 px-5 py-5 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0">
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.TriggerChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                        {/*Files*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open targetId="user-social">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center" style={{height: 45}}>
                                                <div className="media-body">
                                                    <p className=" h5 small text-muted mb-0"
                                                       style={{fontWeight: "bold"}}>Files</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-chevron-down"></i>
                                            </div>
                                        </li>
                                    </Dropdown.Open>
                                    <Dropdown.Content>
                                        <ul className="list-group list-group-flush list-group-no-border-first">

                                            <li className="list-group-item py-6">
                                                <div className="media">

                                                    <div className="icon-shape bg-primary text-white mr-5">
                                                        <i className="fe-paperclip"></i>
                                                    </div>

                                                    <div className="media-body align-self-center overflow-hidden">
                                                        <h6 className="text-truncate mb-0">
                                                            <a href="#" className="text-reset"
                                                               title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>
                                                        </h6>

                                                        <ul className="list-inline d-flex justify-content-between small mb-0">
                                                            <li className="list-inline-item">
                                                                <span className="text-muted">79.2 KB</span>
                                                            </li>
                                                            <li className="list-inline-item r">
                                                                <span className="text-muted text-uppercase">Mar 10 2024 16:42</span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div className="align-self-center ml-5">
                                                        <div className="dropdown">
                                                            <a href="#"
                                                               className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                               data-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                                <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Download <span
                                                                    className="ml-auto fe-download"></span>
                                                                </a>
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Share <span className="ml-auto fe-share-2"></span>
                                                                </a>
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Delete <span className="ml-auto fe-trash-2"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            <BaseChatSidebar.TriggerChildrenCS
                                                childrenCSId="render-files"
                                                className="nav nav-pills nav-justified bg-light border-0 rounded-0 px-5 py-5 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0">
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.TriggerChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                        {/*Links*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open targetId="user-social">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center" style={{height: 45}}>
                                                <div className="media-body">
                                                    <p className=" h5 small text-muted mb-0"
                                                       style={{fontWeight: "bold"}}>Links</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-chevron-down"></i>
                                            </div>
                                        </li>
                                    </Dropdown.Open>
                                    <Dropdown.Content>
                                        <ul className="list-group list-group-flush list-group-no-border-first">

                                            <li className="list-group-item py-6">
                                                <div className="media">

                                                    <div className="icon-shape bg-primary text-white mr-5">
                                                        <i className="fe-paperclip"></i>
                                                    </div>

                                                    <div className="media-body align-self-center overflow-hidden">
                                                        <h6 className="text-truncate mb-0">
                                                            <a href="#" className="text-reset"
                                                               title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">Title
                                                                của link</a>
                                                        </h6>

                                                        <ul className="list-inline d-flex justify-content-between small mb-0">
                                                            <li className="list-inline-item">
                                                                <span className="text-muted">facebook.com</span>
                                                            </li>
                                                            <li className="list-inline-item ">
                                                                <span className="text-muted text-uppercase">Mar 10 2024 16:42</span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div className="align-self-center ml-5">
                                                        <div className="dropdown">
                                                            <a href="#"
                                                               className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                               data-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                                <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Copy <span
                                                                    className="ml-auto fe-copy"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            <BaseChatSidebar.TriggerChildrenCS
                                                childrenCSId="render-links"
                                                className="nav nav-pills nav-justified bg-light border-0 rounded-0 px-5 py-5 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0">
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.TriggerChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open targetId="user-social">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center" style={{height: 45}}>
                                                <div className="media-body">
                                                    <p className=" h5 small text-muted mb-0"
                                                       style={{fontWeight: "bold"}}>Security</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-chevron-down"></i>
                                            </div>
                                        </li>
                                    </Dropdown.Open>
                                    <Dropdown.Content>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item py-6">
                                                <a href="#" className="media text-danger">
                                                    <div className="media-body align-self-center">
                                                        Delete This Conversation
                                                    </div>
                                                    <i className="icon-sm fe-trash"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                    </div>
                </BaseChatSidebar.Body>
            </BaseChatSidebar.MainCS>
            <GalleryCS/>
            <FilesCS/>
            <LinkCS/>
        </BaseChatSidebar>
    )
}
