import React, {useContext} from "react";
import Group from "@/Pages/Chatting/Room/Group.jsx";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";
import {convertBaseJs} from "@/Helper/functions.js";
import UserAvatar from "@/Components/UserAvatar.jsx";
import {useToggle} from "@/Helper/hooks.js";
import ShowUserModal from "@/Components/Modals/ShowUserModal.jsx";

const GroupAdminsCS = () => {
    const {admins, toggleOpenAddUsersModal} = useContext(Group.GroupInfoContext)
    const {allUserOnlineIds, authLayoutData} = useContext(AuthenticatedContext);

    var currentFirstIndexName = null
    return (
        <BaseChatSidebar.ChildrenCS childrenCSId="render-group-admins">
            <BaseChatSidebar.Header>
                <ul className="nav justify-content-between align-items-center">
                    <li className="nav-item">
                        <BaseChatSidebar.CloseCurrentCS
                            className="nav-link text-muted px-0"
                        >
                            <i className="icon-md fe-chevron-left"></i>
                        </BaseChatSidebar.CloseCurrentCS>
                    </li>

                    <li className="text-center d-block ">
                        <h5 className="text-muted">Show Owner/Admins</h5>
                    </li>

                    <li className="nav-item invisible">
                        <i className="icon-md fe-x"></i>
                    </li>
                </ul>
            </BaseChatSidebar.Header>
            <BaseChatSidebar.Body className="h-100">
                <div className="pt-7 pb-4">
                    <div className="container-fluid text-center">
                        <span className="font-weight-bold">Listing Owner/Admins ({admins.length})</span>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {admins.map((user, i) => {
                        var groupNameHtml = (user.name.charAt(0) !== currentFirstIndexName)
                            ? <li className="list-group-item py-2" key={user.name.charAt(0)}>
                                <small className="text-uppercase">{user.name.charAt(0)}</small>
                            </li>
                            : null
                        currentFirstIndexName = user.name.charAt(0)
                        return (
                            <>
                                {groupNameHtml}
                                <li className="list-group-item pt-6 pb-6" key={user.id}>
                                    <div className="media align-items-center">
                                        {(user.id !== authLayoutData.user.id)
                                            ? <a href={"/t/" + convertBaseJs("dm-" + user.id, 37, 10)}>
                                                <UserAvatar
                                                    user={user}
                                                    isOnline={(allUserOnlineIds.includes(user.id))}
                                                    className="mr-5"
                                                />
                                            </a>
                                            : <UserAvatar
                                                user={user}
                                                isOnline={(allUserOnlineIds.includes(user.id))}
                                                className="mr-5"
                                            />
                                        }
                                        <div className="media-body">
                                            <h6 className="mb-0">{user.name}</h6>
                                            <small
                                                className="text-muted">{(allUserOnlineIds.includes(user.id))}</small>
                                        </div>
                                        <UserDropdown user={user}/>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </BaseChatSidebar.Body>
            <BaseChatSidebar.Footer>
                <button className="btn btn-lg btn-block btn-primary d-flex align-items-center"
                        onClick={toggleOpenAddUsersModal}
                        type="submit">
                    Add admins
                    <i className="fi fi-bs-user-key ml-auto"></i>
                </button>
            </BaseChatSidebar.Footer>
        </BaseChatSidebar.ChildrenCS>
    )
}
const UserDropdown = ({user}) => {
    const {on: open, toggle} = useToggle()
    return (
        <>
            <div className="align-self-center pl-5">
                <div className="dropdown">
                    <a href={"/t/" + convertBaseJs("dm-" + user.id, 37, 10)}
                       className="btn btn-sm btn-ico btn-link text-muted w-auto"
                       style={{zIndex: 100}}
                       data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">
                        <i className="fe-more-vertical"></i>
                    </a>
                    <div className="dropdown-menu"
                         style={{zIndex: 200}}>
                        <a className="dropdown-item d-flex align-items-center"
                           href="#">
                            New chat <span
                            className="ml-auto fe-plus-circle"></span>
                        </a>
                        <a className="dropdown-item d-flex align-items-center"
                           onClick={toggle}>
                            Profile <span
                            className="ml-auto fe-user"></span>
                        </a>
                        <a className="dropdown-item d-flex align-items-center"
                           href="#">
                            Delete Chat <span
                            className="ml-auto fe-trash-2"></span>
                        </a>
                    </div>
                </div>
            </div>
            <ShowUserModal isShowing={open} hide={toggle} user={user}/>
        </>
    )
}
export default GroupAdminsCS;
