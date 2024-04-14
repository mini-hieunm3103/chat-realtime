import React, {createContext, useContext, useEffect, useState} from "react";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import {useFetch, useToggle} from "@/Helper/hooks.js";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";
import Dropdown from "@/Components/Dropdown/Dropdown.jsx";
import ChatInfoMedia from "@/Pages/Chatting/Partials/ChildrenCS/ChatInfoMedia.jsx";
import FetchAndRenderMessages from "@/Pages/Chatting/Partials/FetchAndRenderMessages.jsx";
import SendMessage from "@/Pages/Chatting/Partials/SendMessage.jsx";

// CS: ChatSidebar

const ChatInfoContext = createContext()
function DirectMessage({channelId, auth}){
    const {allUserOnlineIds} = useContext(AuthenticatedContext);
    const [searchMessage, setSearchMessage] = useState("")
    const [other, setOther ] = useState(false)
    const {on: openChatSidebar, toggle: toggleChatsidebar} = useToggle()

    const {data: getChannelUsers, isPending: loadChannelUsers, error: errorChannelUsers} = useFetch(route('user.getUsersChannel', {channel_id: channelId}))

    useEffect(() => {
        if (getChannelUsers.hasOwnProperty('data') && !loadChannelUsers ) {
            const otherUser = getChannelUsers.data.find(user => user.id !== auth.id)
            setOther(otherUser)
        }
    }, [loadChannelUsers]);
    return  (
        <>
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

                        <FetchAndRenderMessages channelId={channelId} searchMessageKeyword={searchMessage} />

                        <div className="chat-files hide-scrollbar px-lg-8">
                            <div className="container-xxl">
                                <div className="dropzone-previews-js form-row py-4"></div>
                            </div>
                        </div>

                        <SendMessage channelId={channelId} channelType="dm" />
                    </div>
                }
                <ChatInfoContext.Provider value={{
                    other,
                    open: openChatSidebar,
                    toggleOpen: toggleChatsidebar
                }}>
                    <ChatInfo/>
                </ChatInfoContext.Provider>
            </div>
        </>

    )

}

const ChatInfo = () => {
    const {other, open, toggleOpen} = useContext(ChatInfoContext)
    const [targetMediaTabId, setTargetMediaTabId] = useState("")
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
                                <UserAvatar
                                    user={other}
                                    size="xl"
                                    showProfile={true}
                                    className=" mx-5 mb-5"

                                />
                                <h5>{other.name}</h5>
                                <p className="text-muted">{other.bio}</p>
                            </div>
                            <div className="w-100 d-flex mb-5" style={{justifyContent: "space-evenly"}}>
                                <div className="d-flex flex-wrap justify-content-center align-items-start w-25">
                                    <div className="w-100 d-flex justify-content-center">
                                        <div className="icon-shape bg-light text-basic-inverse mb-1">
                                            <i className="text-muted icon-sm fe-bell"></i>
                                        </div>
                                    </div>
                                    <span className="text-center">Mute</span>
                                </div>
                                <div className="d-flex flex-wrap justify-content-center w-25">
                                    <div className="w-100 d-flex justify-content-center">
                                        <div className="icon-shape bg-light text-basic-inverse mb-1">
                                            <i className="text-muted icon-sm fi fi-rs-thumbtack"></i>
                                        </div>
                                    </div>
                                    <span className="text-center">Pin</span>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3 ml-0 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-2 cursor-pointer">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <i className="text-muted icon-sm fe-users"></i>
                                        <div className="media-body">
                                            <p className=" text-muted ml-5">20 mutual group</p>
                                        </div>
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
                                    <Dropdown.Open>
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
                                                        {/*<img style={{height: 70, width: 70}}*/}
                                                        {/*     loading="lazy"*/}
                                                        {/*     src={asset("images/neom-brFQojtwSzE-unsplash.jpg")}*/}
                                                        {/*     alt=""/>*/}
                                                    </div>
                                                </div>
                                            </div>

                                            <BaseChatSidebar.OpenChildrenCS
                                                childrenCSId="render-chat-info-media"
                                                className="nav nav-pills nav-justified border-0 rounded-0 px-5 pb-5 pt-3 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0" onClick={()=> {setTargetMediaTabId("render-chat-images-videos")}}>
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.OpenChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                        {/*Files*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social" >
                                    <Dropdown.Open>
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
                                            <BaseChatSidebar.OpenChildrenCS
                                                childrenCSId="render-chat-info-media"
                                                className="nav nav-pills nav-justified border-0 rounded-0 px-5 pb-5 pt-3 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0" onClick={()=> {setTargetMediaTabId("render-chat-files")}}>
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.OpenChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                        {/*Links*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <div className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open>
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
                                            <BaseChatSidebar.OpenChildrenCS
                                                childrenCSId="render-chat-info-media"
                                                className="nav nav-pills nav-justified border-0 rounded-0 px-5 pb-5 pt-3 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0" onClick={()=> {setTargetMediaTabId("render-chat-links")}}>
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.OpenChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        {/*Security*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <div className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open>
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
                                                <a href="#" className="media text-muted">
                                                    <div className="media-body align-self-center">
                                                        Report
                                                    </div>
                                                    <i className="icon-sm fe-alert-triangle"></i>
                                                </a>
                                            </li>
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
                            </div>
                        </div>
                    </div>
                </BaseChatSidebar.Body>
            </BaseChatSidebar.MainCS>
            <ChatInfoMedia targetMediaTabId={targetMediaTabId} setTargetMediaTabId={setTargetMediaTabId} />
        </BaseChatSidebar>
    )
}
export default React.memo(DirectMessage);
