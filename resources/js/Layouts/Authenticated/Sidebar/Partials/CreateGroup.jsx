import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import TextareaInput from "@/Components/Input/TextareaInput.jsx";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import Swal from "sweetalert2";
import {useFetch, useGetUsers, useToggle} from "@/Helper/hooks.js";
import UserAvatar from "@/Components/UserAvatar.jsx";
import Highlighter from "react-highlight-words";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import Button from "@/Components/Button.jsx";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingDiv from "@/Components/LoadingDiv.jsx";
import {asset, isObjectEmpty} from "@/Helper/functions.js";
import {maxAvatarFileSize} from "@/Helper/config.js";
import GroupAvatar from "@/Components/GroupAvatar.jsx";

function CreateGroup({startUp}) {
    const {allUserOnlineIds} = useContext(AuthenticatedContext);
    // post
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        avatar_file: null,
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
    const selectedFileInputRef = useRef(null)
    const [avatarFile, setAvatarFile] = useState(null)
    const [errorAvatarFile, setErrorAvatarFile] = useState({
        fileSizeError: false,
        fileTypeError: false,
    })
    const handleOnChange = (event) => {
        const selectedFile = event.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

        if (!selectedFile) return;

        const isFileSizeAllowed = selectedFile.size <= maxAvatarFileSize;
        const isFileTypeAllowed = allowedTypes.includes(selectedFile.type)

        if (isFileTypeAllowed && isFileSizeAllowed){
            setAvatarFile(selectedFile)
        }
        setErrorAvatarFile({
            fileSizeError: !isFileSizeAllowed,
            fileTypeError: !isFileTypeAllowed
        })
    };
    const onChooseFile = () =>
        selectedFileInputRef.current.click();
    const handleRemoveFile = () => {
        setAvatarFile(null)
        setErrorAvatarFile({
            fileSizeError: false,
            fileTypeError: false,
        })
    }
    const handleCheckboxChange = (userId, isChecked) => {
        if (isChecked) {
            setUsersPostData(prevState => [...prevState, userId])
        } else {
            setUsersPostData(prevState => prevState.filter(id => id !== userId))
        }
    }
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
    useEffect(() => {
        if (!errorAvatarFile.fileSizeError && !errorAvatarFile.fileTypeError) {
            setData("avatar_file", avatarFile)
        }
    }, [avatarFile]);
    const createChatroom = (e) => {
        e.preventDefault();
        post(route('group.create'), {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success" ,
                    title: "Create Group Successfully!",
                    showConfirmButton: false,
                    timer: 2500
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
                                   aria-selected="true">
                                    <span className={((errors.name || errorAvatarFile.fileSizeError || errorAvatarFile.fileTypeError) ? "text-danger" : "")}>Details</span>
                                </a>
                            </li>

                            <li className="nav-item">
                                <a href="#create-group-members" className="nav-link" data-toggle="tab" role="tab"
                                   aria-selected="false"><span className={(errors.users ? "text-danger" : "")}>Members</span></a>
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
                                <div className="form-group mt-6">
                                    <InputLabel value="Avatar" className="small"/>
                                    <div className="custom-selected-file col-12 form-control-lg pl-4">
                                        <div className="choose-file btn px-4 py-1 col-auto" onClick={onChooseFile}>
                                            <span>Choose file</span>
                                        </div>
                                        <p className="file-name m-0 ml-3 text-truncate text-center">{(avatarFile) ? avatarFile.name : null}</p>
                                        <div
                                            className={"trash btn " + ((!avatarFile) ? "d-none" : "")}
                                            onClick={handleRemoveFile}>
                                            {avatarFile
                                                ? <i className="fe-x"></i>
                                                : null
                                            }
                                        </div>
                                        <input
                                            ref={selectedFileInputRef}
                                            className="d-none"
                                            onChange={handleOnChange}
                                            type="file"/>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <div
                                        className={"cursor-default avatar avatar-xl " + ((!data.avatar_file) ? " bg-success text-white " : " ")}>
                                        {(avatarFile)
                                            ? <img className="avatar-img border border-primary"
                                                   src={URL.createObjectURL(avatarFile)}
                                                   alt={data.name}/>
                                            : <GroupAvatar name={data.name} size="xl" />
                                        }
                                    </div>
                                    <div
                                        className="d-flex flex-md-column align-content-center justify-content-center mt-4">
                                         <span
                                             className={"mb-4 " + ((errorAvatarFile.fileSizeError) ? "text-danger" : ((avatarFile) ? "text-success" : ""))}>
                                            <i className={`fe-${(!errorAvatarFile.fileSizeError && avatarFile) ? "check" : "alert"}-circle mr-2`}></i>
                                            Max file size 3mb.
                                        </span>
                                        <span
                                            className={((errorAvatarFile.fileTypeError) ? "text-danger" : ((avatarFile) ? "text-success" : ""))}>
                                            <i className={`fe-${(!errorAvatarFile.fileTypeError && avatarFile) ? "check" : "alert"}-circle mr-2`}></i>
                                            Only JPEG, PNG, and GIF images are allowed.
                                        </span>

                                    </div>
                                </div>
                            </div>

                            <div id="create-group-members" className="tab-pane fade" role="tabpanel">
                                <SearchInput className="mb-3" keyword={keyword} setKeyword={setKeyword}
                                             placeHolder="Search for name or email..."/>
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
                                        loader={<LoadingDiv/>}
                                        height="40rem"
                                        className="hide-scrollbar"
                                    >
                                        {allUsers.map((user, i) => {
                                            var groupNameHtml = (currentFirstIndexName !== user.name.charAt(0))
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
