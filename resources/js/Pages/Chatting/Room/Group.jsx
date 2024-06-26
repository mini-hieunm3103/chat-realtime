import CollapseButton from "@/Components/CollapseButton.jsx";
import React, {createContext, Suspense, useContext, useEffect, useRef, useState} from "react";
import {useFetch, useToggle} from "@/Helper/hooks.js";
import {asset, convertBaseJs, isObjectEmpty} from "@/Helper/functions.js";
import GroupAvatar from "@/Components/GroupAvatar.jsx";
import LoadingModal from "@/Components/Modals/LoadingModal.jsx";
import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";
import Dropdown from "@/Components/Dropdown/Dropdown.jsx";
import AddUsersToGroup from "@/Components/Modals/AddUsersToGroup.jsx";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import GroupSettings from "@/Pages/Chatting/Partials/ChildrenCS/GroupSettings.jsx";
import GroupUsers from "@/Pages/Chatting/Partials/ChildrenCS/GroupUsers.jsx";
import GroupAdminsCS from "@/Pages/Chatting/Partials/ChildrenCS/GroupAdmins.jsx";
import GroupBlockedUsers from "@/Pages/Chatting/Partials/ChildrenCS/GroupBlockedUsers.jsx";
import ChatInfoStorage from "@/Pages/Chatting/Partials/ChildrenCS/ChatInfoStorage.jsx";
import ListMessages from "@/Pages/Chatting/Partials/Messages/ListMessages.jsx";
import SendMessage from "@/Pages/Chatting/Partials/Messages/SendMessage.jsx";
import EditGroupInfoModal from "@/Components/Modals/EditGroupInfoModal.jsx";

const GroupInfoContext = createContext();
// CS: ChatSidebar
function Group({ auth ,channelId}){
    const trueUrl = convertBaseJs(window.location.pathname.match(/\d+/)[0], 10, 37)
    const groupId = trueUrl.match(/\d+/)[0]

    const [searchMessages, setSearchMessages] = useState("")
    const [groupDetail, setGroupDetail] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const {on: openChatSidebar, toggle:  toggleChatsidebar} = useToggle()
    const {on: openAddUsersModal, toggle:  toggleOpenAddUsersModal} = useToggle()

    const {data: getGroupDetail, isPending: loadGroupDetail, error: errorGroupDetail} = useFetch(route('group.detail', {group_id: groupId}))
    const {data: getChannelUsers, isPending: loadChannelUsers, error: errorChannelUsers} = useFetch(route('channel.users', {channel_id: channelId}))
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
    const {on: openLoadingModal, toggle: toggleLoadingModal} = useToggle( !groupDetail || !listUsers.length > 0)
    return (
        <>
            {/*Modal*/}
            <AddUsersToGroup channelId={channelId} isShowing={openAddUsersModal}
                             hide={toggleOpenAddUsersModal} usersChannel={listUsers}/>
            <LoadingModal isShowing={openLoadingModal} hide={toggleLoadingModal}/>
            {/*Modal*/}
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
                                            group={groupDetail}
                                        />

                                        {groupDetail && listUsers.length > 0 &&
                                            <div className="media-body align-self-center text-truncate">
                                                <h6 className="text-truncate mb-n1">{groupDetail.name}</h6>
                                                <small className="text-muted">{listUsers.length} members</small>
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
                                            <div className="nav-link text-muted px-3"
                                                 onClick={toggleOpenAddUsersModal}
                                            >
                                                <i className="icon-md fe-user-plus"></i>
                                            </div>
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
                            <SearchInput
                                keyword={searchMessages}
                                setKeyword={setSearchMessages}
                                placeHolder="Search this chat"
                            />
                        </div>
                    </div>

                    <ListMessages channelId={channelId} searchMessageKeyword={searchMessages} />
                    <SendMessage channelId={channelId} channelType="group" />
                </div>

                <GroupInfoContext.Provider
                    value={{
                        channelId: channelId,
                        groupDetail: groupDetail,
                        admins: groupDetail.admins,
                        owner: groupDetail.owner,
                        users: listUsers,
                        open: openChatSidebar,
                        toggleOpen: toggleChatsidebar,
                        openAddUsersModal: openAddUsersModal,
                        toggleOpenAddUsersModal: toggleOpenAddUsersModal,
                    }}>
                    <GroupInfo/>
                </GroupInfoContext.Provider>
            </div>
        </>

    )
}

const GroupInfo = () => {
    const {groupDetail, users, open, channelId, toggleOpen, toggleOpenAddUsersModal} = useContext(GroupInfoContext)
    const [targetMediaTabId, setTargetMediaTabId] = useState("")
    const {on: openEditGroupInfo, toggle:  toggleOpenEditGroupInfo} = useToggle()
    if (users.length === 0 || !groupDetail) {
        return null
    }

    const allowedInviteViaLink = true;
    return (
        <>
            <EditGroupInfoModal groupDetail={groupDetail} isShowing={openEditGroupInfo} hide={toggleOpenEditGroupInfo} />
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
                                        group={groupDetail}
                                        size="xl"
                                        className=" mx-5 mb-5"
                                    />
                                    <h5>{groupDetail.name}</h5>
                                </div>
                                <div className="w-100 d-flex justify-content-around mb-5">
                                    <div className="d-flex flex-wrap justify-content-center align-items-start w-25">
                                        <div className="w-100 d-flex justify-content-center">
                                            <div className="cursor-pointer icon-shape bg-light text-basic-inverse mb-1">
                                                <i className="text-muted icon-sm fe-bell"></i>
                                            </div>
                                        </div>
                                        <span className="text-center cursor-pointer">Mute</span>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-center w-25"
                                        onClick={toggleOpenEditGroupInfo}
                                    >
                                        <div className="w-100 d-flex justify-content-center">
                                            <div className="cursor-pointer icon-shape bg-light text-basic-inverse mb-1">
                                                <i className="text-muted icon-sm fe-edit-3"></i>
                                            </div>
                                        </div>
                                        <span className="text-center cursor-pointer">Edit</span>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-center w-25"
                                         onClick={toggleOpenAddUsersModal}>
                                        <div className="w-100 d-flex justify-content-center">
                                            <div className="cursor-pointer icon-shape bg-light text-basic-inverse mb-1">
                                                <i className="text-muted icon-sm fe-user-plus"></i>
                                            </div>
                                        </div>
                                        <span className="text-center cursor-pointer">Add members</span>
                                    </div>
                                    <BaseChatSidebar.OpenChildrenCS
                                        childrenCSId="render-group-manage"
                                        className="d-flex flex-wrap justify-content-center w-25">
                                        <div className="w-100 d-flex justify-content-center">
                                            <div className="cursor-pointer icon-shape bg-light text-basic-inverse mb-1">
                                                <i className="text-muted icon-sm fe-settings"></i>
                                            </div>
                                        </div>
                                        <span className="text-center cursor-pointer">Manage group</span>
                                    </BaseChatSidebar.OpenChildrenCS>

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
                                </ul>
                            </div>
                            {/*Group's users*/}
                            <div className="card mb-3 border-0 rounded-0">
                                <ul className="list-group list-group-flush">
                                    <Dropdown defaultOpen={true}>
                                        <Dropdown.Open>
                                            <li className="list-group-item py-2">
                                                <div className="media align-items-center" style={{height: 45}}>
                                                    <div className="media-body">
                                                        <p className=" h5 small text-muted mb-0"
                                                           style={{fontWeight: "bold"}}>Group member</p>
                                                    </div>
                                                    <i className={"text-muted icon-sm fe-chevron-down"}></i>
                                                </div>
                                            </li>
                                        </Dropdown.Open>
                                        <Dropdown.Content>
                                            <BaseChatSidebar.OpenChildrenCS
                                                childrenCSId="render-group-users"
                                            >
                                                <div className="list-group-item py-2 cursor-pointer">
                                                    <div className="media align-items-center" style={{height: 45}}>
                                                        <i className="mr-5 text-muted icon-sm fe-users"></i>
                                                        <div className="media-body">
                                                        <span
                                                            className=" h5 small text-muted mb-0"> {users.length} members (Click to see all members) </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </BaseChatSidebar.OpenChildrenCS>
                                            {allowedInviteViaLink
                                                ? <div
                                                    className="list-group-item py-4 cursor-pointer d-flex justify-content-between">
                                                    <div className="media align-items-center"
                                                         style={{height: 45, width: "fit-content"}}>
                                                        <i className="mr-5 text-muted icon-sm fe-link"></i>
                                                        <div className="media-body">
                                                            <span className=" text-muted mb-0"> Group Link</span>
                                                            <br/>
                                                            <span className=" small text-primary mb-0">Link to group</span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-around align-items-center">
                                                        <button className=" btn btn-secondary py-2 px-4 mr-2">
                                                            <i className="fe-copy"></i>
                                                        </button>
                                                        <button className=" btn btn-secondary py-2 px-4 mr-2">
                                                            <i className="fe-share-2"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                :null
                                            }
                                        </Dropdown.Content>
                                    </Dropdown>
                                </ul>
                            </div>
                            <div className="card mb-3 border-0 rounded-0">
                                <ul className="list-group list-group-flush pb-3">
                                    <Dropdown>
                                        <Dropdown.Open>
                                            <li className="list-group-item py-2">
                                                <div className="media align-items-center" style={{height: 45}}>
                                                    <div className="media-body">
                                                        <p className=" h5 small text-muted mb-0"
                                                           style={{fontWeight: "bold"}}>Media/documents/links</p>
                                                    </div>
                                                    <i className="text-muted icon-sm fe-chevron-down"></i>
                                                </div>
                                            </li>
                                        </Dropdown.Open>
                                        <Dropdown.Content>
                                            <ul className="list-group list-group-flush">
                                                <BaseChatSidebar.OpenChildrenCS
                                                    childrenCSId="render-chat-info-storage"
                                                    className="list-group-item px-5 cursor-pointer nav nav-pills nav-justified rounded-0 py-3 card-bg-color">
                                                    <div className="media align-items-center" style={{height: 45}} onClick={()=> {setTargetMediaTabId("render-chat-info-storage-media")}}>
                                                        <div
                                                            className="cursor-pointer icon-shape bg-light text-basic-inverse mr-4">
                                                            <i className="text-muted icon-sm fe-image"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <span className=" h5 small text-muted mb-0">Media</span>
                                                        </div>
                                                    </div>
                                                </BaseChatSidebar.OpenChildrenCS>
                                                <BaseChatSidebar.OpenChildrenCS
                                                    childrenCSId="render-chat-info-storage"
                                                    className="list-group-item px-5 cursor-pointer nav nav-pills nav-justified rounded-0 py-3 card-bg-color">
                                                    <div className="media align-items-center" style={{height: 45}} onClick={()=> {setTargetMediaTabId("render-chat-info-storage-documents")}}>
                                                        <div
                                                            className="cursor-pointer icon-shape bg-light text-basic-inverse mr-4">
                                                            <i className="text-muted icon-sm fe-file"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <span className=" h5 small text-muted mb-0">Documents</span>
                                                        </div>
                                                    </div>
                                                </BaseChatSidebar.OpenChildrenCS>
                                                <BaseChatSidebar.OpenChildrenCS
                                                    childrenCSId="render-chat-info-storage"
                                                    className="list-group-item px-5 cursor-pointer nav nav-pills nav-justified rounded-0 py-3 card-bg-color">
                                                    <div className="media align-items-center" style={{height: 45}} onClick={()=> {setTargetMediaTabId("render-chat-info-storage-links")}}>
                                                        <div
                                                            className="cursor-pointer icon-shape bg-light text-basic-inverse mr-4">
                                                            <i className="text-muted icon-sm fe-link"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <span className=" h5 small text-muted mb-0">Links</span>
                                                        </div>
                                                    </div>
                                                </BaseChatSidebar.OpenChildrenCS>
                                            </ul>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </ul>
                            </div>
                            {/*Security*/}
                            <div className="card mb-3 border-0 rounded-0">
                                <div className="list-group list-group-flush">
                                    <Dropdown>
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
                                                <li className="list-group-item py-6">
                                                    <a href="#" className="media text-danger">
                                                        <div className="media-body align-self-center">
                                                            Leave group
                                                        </div>
                                                        <i className="icon-sm fe-log-out"></i>
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
                <GroupSettings/>
                <GroupAdminsCS />
                <GroupBlockedUsers />
                <GroupUsers/>
                <ChatInfoStorage channelId={channelId} targetMediaTabId={targetMediaTabId} setTargetMediaTabId={setTargetMediaTabId} />
            </BaseChatSidebar>
        </>
    )
}

Group.GroupInfoContext = GroupInfoContext;
export default Group;
