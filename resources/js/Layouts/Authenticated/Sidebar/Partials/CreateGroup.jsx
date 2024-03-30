import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import TextareaInput from "@/Components/TextareaInput.jsx";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import Swal from "sweetalert2";
import {useFetch, useGetUsers} from "@/Helper/hooks.js";
import UserAvatar from "@/Components/UserAvatar.jsx";
import Highlighter from "react-highlight-words";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import Button from "@/Components/Button.jsx";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingDiv from "@/Components/LoadingDiv.jsx";
import {isObjectEmpty} from "@/Helper/functions.js";

function CreateGroup({startUp}) {
    const {allUserOnlineIds} = useContext(AuthenticatedContext);
    // post
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        topic: '',
        description: '',
        users: []
    });
    const [usersPostData, setUsersPostData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [query, setQuery] = useState({
        page: 1,
        keyword: "",
        needAuth:false,
    })
    const urlFetch = route('user.getAllUsers', query)
    //get
    const {data:getUsers, isPending, error} = useFetch(urlFetch)
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
    const handleCheckboxChange = (userId, isChecked) => {
        if (isChecked) {
            setUsersPostData(prevState => [...prevState, userId])
        } else {
            setUsersPostData(prevState => prevState.filter(id => id !== userId))
        }
    }
    const createChatroom = (e) => {
        e.preventDefault();
        post(route('group.store'), {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success" ,
                    title: "Create Group Successfully!",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(()=> {
                    location.reload()
                }, 3000)
            }
        })
    }
    useEffect(() => {
        setData('users', usersPostData)
    }, [usersPostData]);
    var currentFirstIndexName = null
    return (
        <div className={"tab-pane fade h-100 " + (startUp && "show active")} id="tab-content-create-chat"
             role="tabpanel">
            <form onSubmit={createChatroom} className="d-flex flex-column h-100">
                <div className="hide-scrollbar h-100">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Create group</h2>
                        {(Object.keys(errors).length !== 0) &&
                            <>
                                <div className="alert alert-danger text-center" role="alert">
                                    Please Check Your Information Again!
                                </div>
                            </>
                        }
                        <ul className="nav nav-tabs nav-justified mb-6" role="tablist">
                            <li className="nav-item">
                                <a href="#create-group-details" className="nav-link active" data-toggle="tab" role="tab"
                                   aria-selected="true">Details</a>
                            </li>

                            <li className="nav-item">
                                <a href="#create-group-members" className="nav-link" data-toggle="tab" role="tab"
                                   aria-selected="false">Members</a>
                            </li>
                        </ul>

                        <div className="tab-content" role="tablist">

                            <div id="create-group-details" className="tab-pane fade show active" role="tabpanel">
                                <div className="form-group">
                                    <InputLabel htmlFor="group-name" value="Name" className="small"/>

                                    <TextInput
                                        id="group-name"
                                        name="name"
                                        value={data.name}
                                        error={errors.name}
                                        isFocused={true}
                                        placeholder="Group Name"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="form-group">
                                    <InputLabel htmlFor="new-chat-topic" value="Topic (optional)"
                                                className="small"/>

                                    <TextInput
                                        id="new-chat-topic"
                                        name="name"
                                        value={data.topic}
                                        error={errors.topic}
                                        isFocused={true}
                                        placeholder="Group Topic"
                                        onChange={(e) => setData('topic', e.target.value)}
                                    />

                                    <InputError message={errors.topic} className="mt-2"/>
                                </div>
                                <div className="form-group">
                                    <InputLabel htmlFor="new-chat-description" value="Description" className="small"/>

                                    <TextareaInput
                                        id="new-chat-description"
                                        name="description"
                                        value={data.description}
                                        error={errors.description}
                                        placeholder="Group Description"
                                        data-autosize="true"
                                        rows="6"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />

                                    <InputError message={errors.description} className="mt-2"/>
                                </div>
                            </div>

                            <div id="create-group-members" className="tab-pane fade" role="tabpanel">
                                <SearchInput className="mb-3" keyword={keyword} setKeyword={setKeyword} placeHolder="Search for name or email..." />
                                <nav className="list-group list-group-flush mb-n6">
                                    {(errors.users) &&
                                        <>
                                            <div className="alert alert-danger" role="alert">
                                                {errors.users}
                                            </div>
                                        </>
                                    }
                                    <InfiniteScroll
                                        next={fetchMoreUsers}
                                        dataLength={allUsers.length}
                                        hasMore={hasMore}
                                        loader={<LoadingDiv />}
                                        height="40rem"
                                        className="hide-scrollbar"
                                    >
                                        {allUsers.map((user, i) => {
                                            var groupNameHtml = (currentFirstIndexName  !== user.name.charAt(0))
                                                ? <div className="mb-6">
                                                    <small className="text-uppercase">{user.name.charAt(0)}</small>
                                                </div>
                                                : null
                                            currentFirstIndexName = user.name.charAt(0)
                                            return (
                                                <>
                                                    {groupNameHtml}
                                                    <div className="card mb-4" key={i}>
                                                        <div className="card-body">

                                                            <div className="media">
                                                                <UserAvatar
                                                                    user={user}
                                                                    isOnline={allUserOnlineIds.includes(user.id)}
                                                                    className="mr-5"
                                                                />

                                                                <div className="media-body align-self-center">
                                                                    <h6 className="mb-0">
                                                                        <Highlighter
                                                                            highlightClassName="highlighted-text"
                                                                            searchWords={[keyword]}
                                                                            autoEscape={true}
                                                                            textToHighlight={user.name}
                                                                        />
                                                                    </h6>
                                                                    <small
                                                                        className="text-muted text-truncate">
                                                                        <Highlighter
                                                                            highlightClassName="highlighted-text"
                                                                            searchWords={[keyword]}
                                                                            autoEscape={true}
                                                                            textToHighlight={user.email}
                                                                        />
                                                                    </small>
                                                                </div>

                                                                <div className="align-self-center ml-auto">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <CheckboxInput
                                                                            id={`id-create-group-user-${i}`}
                                                                            name = 'users[]'
                                                                            checked= {data.users.includes(user.id)}
                                                                            onChange={(e) => handleCheckboxChange(user.id, e.target.checked)}
                                                                        />
                                                                        <label className="custom-control-label"
                                                                               htmlFor={`id-create-group-user-${i}`}></label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <label className="stretched-label" htmlFor={`id-create-group-user-${i}`}></label>
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

                <div className="pb-6 " style={{bottom: 0}}>
                    <div className="container-fluid" style={{zIndex: 99}}>
                        <Button size="lg" className="btn-block" type="submit">Create group</Button>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default CreateGroup
