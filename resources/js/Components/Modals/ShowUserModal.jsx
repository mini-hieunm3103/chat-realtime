import React from "react";
import BaseModal from "@/Components/Modals/Base//BaseModal.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import {convertBaseJs} from "@/Helper/functions.js";

export default function ShowUserModal({isShowing, hide, user}){
    return (
        <BaseModal
            isShowing = {isShowing}
            hide = {hide}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Profile Information</h5>
                    <button onClick={hide} type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="d-flex h-100 flex-column">
                        <div className="hide-scrollbar flex-fill">
                            <div className="container-fluid">
                                <div className="border-bottom text-center py-9 px-10">
                                    <UserAvatar
                                        showProfile={false}
                                        user={user}
                                        isOnline={false}
                                        className="mx-5 mb-5"
                                        size="xl"
                                    />
                                    <h2>{user.name}</h2>
                                    {user.bio && <p className="text-muted">{user.bio}</p>}
                                    <div className="nav nav-pills nav-justified bg-light rounded-0 mt-5"
                                         role="tablist">
                                        <a className="nav-item btn btn-outline-primary"
                                           href={"/t/" + convertBaseJs("dm-" + user.id, 37, 10)} data-toggle="tab"
                                           aria-selected="true" role="tab">Send Messages</a>
                                    </div>
                                </div>
                                <div className="tab-content" role="tablist">
                                    <div id="chat-2-user-details" className="tab-pane fade show active" role="tabpanel">
                                        <ul className="list-group list-group-flush mb-8">
                                            <li className="list-group-item py-6">
                                                <div className="media align-items-center">
                                                    <div className="media-body">
                                                        <p className="small text-muted mb-0">Email</p>
                                                        <p>{user.email}</p>
                                                    </div>
                                                    <i className="text-muted icon-sm fe-mail"></i>
                                                </div>
                                            </li>

                                            <li className="list-group-item py-6">
                                                <div className="media align-items-center">
                                                    <div className="media-body">
                                                        <p className="small text-muted mb-0">Participation time</p>
                                                        <p>{user.time}</p>
                                                    </div>
                                                    <i className="text-muted icon-sm fe-clock"></i>
                                                </div>
                                            </li>
                                        </ul>

                                        <ul className="list-group list-group-flush mb-8">
                                            <li className="list-group-item py-6">
                                                <a href={user.twitter}
                                                   className={"media " + ((user.twitter) ? "text-muted" : "text-white-30")}>
                                                    <div className="media-body align-self-center">
                                                        Twitter
                                                    </div>
                                                    <i className="icon-sm fe-twitter"></i>
                                                </a>
                                            </li>

                                            <li className="list-group-item py-6">
                                                <a href={user.facebook}
                                                   className={"media " + ((user.facebook) ? "text-muted" : "text-white-30")}>
                                                    <div className="media-body align-self-center">
                                                        Facebook
                                                    </div>
                                                    <i className="icon-sm fe-facebook"></i>
                                                </a>
                                            </li>

                                            <li className="list-group-item py-6">
                                                <a href={user.github}
                                                   className={"media " + ((user.github) ? "text-muted" : "text-white-30")}>
                                                    <div className="media-body align-self-center">
                                                        Github
                                                    </div>
                                                    <i className="icon-sm fe-github"></i>
                                                </a>
                                            </li>
                                        </ul>

                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item py-6">
                                                <div className="media text-muted">
                                                    <div className="media-body align-self-center">
                                                        Chặn tin nhắn và cuộc gọi
                                                    </div>
                                                    <i className="fa-solid fa-ban"></i>
                                                </div>
                                            </li>
                                            <li className="list-group-item py-6">
                                                <div className="media text-muted">
                                                    <div className="media-body align-self-center">
                                                        Chặn tin nhắn và cuộc gọi
                                                    </div>
                                                    <i className="fa-solid fa-ban"></i>
                                                </div>
                                            </li>
                                            <li className="list-group-item py-6">
                                                <div className="media text-muted">
                                                    <div className="media-body align-self-center">
                                                        Chặn tin nhắn và cuộc gọi
                                                    </div>
                                                    <i className="fa-solid fa-ban"></i>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </BaseModal>
    )
}
// export default React.memo(ShowUserModal)
