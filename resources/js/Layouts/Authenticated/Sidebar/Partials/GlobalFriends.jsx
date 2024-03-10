import React, {useState, useEffect, useRef} from "react";
import useGetUsers from "@/Helper/useGetUsers.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import {convertBaseJs} from "@/Helper/functions.js";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import Highlighter from 'react-highlight-words';
import {post} from "axios";
import {useForm} from "@inertiajs/react";
function GlobalFriends({startUp}){
    const [keyword, setKeyword] = useState('')
    const allUsers = useGetUsers()(keyword);
    // nếu có error thì chỉ có thể do user không tồn tại
    var currentFirstIndexName = null
    return (
        <div className={"tab-pane fade h-100 " +(startUp && "show active")} id="tab-content-friends" role="tabpanel">
            <div className="d-flex flex-column h-100">
                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">
                        <h2 className="font-bold mb-6">Global Friends</h2>
                        <SearchInput
                            keyword={keyword}
                            setKeyword={setKeyword}
                            className="mb-6"
                            placeHolder="Search for name or email..."
                        />
                        <button type="button" className="btn btn-lg btn-block btn-secondary d-flex align-items-center mb-6" data-toggle="modal" data-target="#invite-friends">
                            Invite friends
                            <i className="fe-users ml-auto"></i>
                        </button>

                        <nav className="mb-n6">
                            {allUsers.map((user, i) => {
                                var groupNameHtml = (user.name.charAt(0) !== currentFirstIndexName)
                                    ? <div className="mb-6" key={user.name.charAt(0)}>
                                        <small className="text-uppercase">{user.name.charAt(0)}</small>
                                    </div>
                                    : null
                                currentFirstIndexName = user.name.charAt(0)
                                return (
                                    <>
                                        {groupNameHtml}
                                        <div className="card mb-4" key={user.id}>
                                            <div className="card-body">

                                                <div className="media">
                                                    <UserAvatar
                                                        user={user}
                                                        isOnline={(user.online === 1)}
                                                        className="mr-5"
                                                    />
                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0 global-friend-match">
                                                            <Highlighter
                                                                highlightClassName="highlighted-text"
                                                                searchWords={[keyword]}
                                                                autoEscape={true}
                                                                textToHighlight={user.name}
                                                            />
                                                        </h6>
                                                        <small className="text-muted text-truncate global-friend-match">
                                                            <Highlighter
                                                                highlightClassName="highlighted-text"
                                                                searchWords={[keyword]}
                                                                autoEscape={true}
                                                                textToHighlight={user.email}
                                                            />
                                                        </small>
                                                    </div>

                                                    <div className="align-self-center ml-5">
                                                        <div className="dropdown z-index-max">
                                                            <a href="#"
                                                               className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                               data-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                                <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    New chat <span className="ml-auto fe-plus-circle"></span>
                                                                </a>
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Delete Chat <span
                                                                    className="ml-auto fe-trash-2"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href={"/t/"+convertBaseJs("dm-"+user.id, 37, 10)} className="stretched-link"></a>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalFriends;
