import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useFetch, useToggle} from "@/Helper/hooks.js";
import UserAvatar from "@/Components/UserAvatar.jsx";
import {convertBaseJs, isObjectEmpty} from "@/Helper/functions.js";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import Highlighter from 'react-highlight-words';
import InviteFriendsModal from "@/Components/Modals/InviteFriendsModal.jsx";
import ShowUserModal from "@/Components/Modals/ShowUserModal.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import LoadingDiv from "@/Components/LoadingDiv.jsx";

function GlobalFriends({startUp}) {
    const {allUserOnlineIds} = useContext(AuthenticatedContext);
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [query, setQuery] = useState({
        page: 1,
        keyword: "",
        needAuth:false,
    })

    const {data:getUsers, isPending, error} = useFetch(route('user.getAllUsers', query))
    const [allUsers, setAllUsers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreUsers = useCallback(() => {
        setPageNumber(prevState => prevState+1)
    })
    useEffect(() => {
        if (!isObjectEmpty(getUsers)){
            setAllUsers(prevUsers =>{
                return [...new Set([...prevUsers, ...getUsers.data])]
            });
            setHasMore(query.page <= getUsers.meta.last_page)
        }
    }, [getUsers]);
    useEffect(() => {
        setPageNumber(1)
        setQuery({
            ...query,
            keyword: keyword,
            page: pageNumber
        })
        setAllUsers([]);
    }, [keyword]);
    useEffect(() => {
        setQuery({
            ...query,
            page: pageNumber
        })
    }, [pageNumber]);
    const {on: open, toggle} = useToggle()
    var currentFirstIndexName = null
    return (
        <div className={"tab-pane fade h-100 " + (startUp && "show active")} id="tab-content-friends" role="tabpanel">
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
                        <button type="button" onClick={toggle} className="btn btn-lg btn-block btn-secondary d-flex align-items-center mb-6">
                            Invite friends
                            <i className="fe-users ml-auto"></i>
                        </button>
                        <InviteFriendsModal isShowing={open} hide={toggle}/>
                        <nav className="mb-n6">
                            <InfiniteScroll
                                next={fetchMoreUsers}
                                dataLength={allUsers.length}
                                hasMore={hasMore}
                                loader={<LoadingDiv />}
                                height="48rem"
                                className="hide-scrollbar"
                            >
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
                                                            isOnline={(allUserOnlineIds.includes(user.id))}
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
                                                            <small
                                                                className="text-muted text-truncate global-friend-match">
                                                                <Highlighter
                                                                    highlightClassName="highlighted-text"
                                                                    searchWords={[keyword]}
                                                                    autoEscape={true}
                                                                    textToHighlight={user.email}
                                                                />
                                                            </small>
                                                        </div>
                                                        <UserDropdown
                                                            user={user}
                                                        />

                                                    </div>
                                                    <a href={"/t/" + convertBaseJs("dm-" + user.id, 37, 10)}
                                                       className="stretched-link"></a>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </InfiniteScroll>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
    )
}
const UserDropdown = ({user}) => {
    const {on: open, toggle} = useToggle()
    return (
        <>
        <div className="align-self-center pl-5 py-4">
                <div className="dropdown">
                    <a href="#"
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
export default GlobalFriends;
