import BaseModal from "@/Components/Modals/Base/BaseModal.jsx";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useGetUsers} from "@/Helper/hooks.js";
import UserAvatar from "@/Components/UserAvatar.jsx";
import Highlighter from "react-highlight-words";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import {useForm} from "@inertiajs/react";
import Swal from "sweetalert2";
import Button from "@/Components/Button.jsx";

const AddUsersToGroupContext = createContext()
const AddUsersToGroup = ({isShowing, hide, usersChannel, channelId}) => {
    const {data, setData, patch, processing, errors, reset} = useForm({
        channelId:channelId,
        users: []
    });
    const [usersPostData, setUsersPostData] = useState([]);
    const [keyword, setKeyword] = useState("")
    const allUsers = useGetUsers(keyword, false, true);
    var currentFirstIndexName = null
    const handleCheckboxChange = (userId, isChecked) => {
        if (isChecked) {
            setUsersPostData(prevState => [...prevState, userId])
        } else {
            setUsersPostData(prevState => prevState.filter(id => id !== userId))
        }
    }
    const addUsers = (e) => {
        e.preventDefault();
        if (!data.users.length){
            hide()
        } else {
            patch(route('group.addUsers'), {
                onSuccess: () => {
                    Swal.fire({
                        position: "top-right",
                        icon: "success",
                        title: "Add Users To Group Successfully!",
                        showConfirmButton: false,
                        timer: 3000
                    });
                    setTimeout(() => {
                        location.reload()
                    }, 3000)
                }
            })
        }
    }
    useEffect(() => {
        setData('users', usersPostData)
    }, [usersPostData]);
    return (<AddUsersToGroupContext.Provider value={{
        handleCheckboxChange,
        keyword,
        isInGroup: usersChannel,
    }}>
        <BaseModal
            isShowing={isShowing}
            hide={hide}
        >
            <form className="modal-content" onSubmit={addUsers}>
                <div className="modal-header">
                    <div className="media flex-fill">
                        <div className="icon-shape rounded-lg bg-primary text-white mr-5">
                            <i className="fe-user-plus"></i>
                        </div>
                        <div className="media-body align-self-center">
                            <h5 className="modal-title">Add Friends</h5>
                            <p className="small">Invite colleagues, clients and friends.</p>
                        </div>
                    </div>

                    <button onClick={hide} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                    <SearchInput setKeyword={setKeyword} keyword={keyword}
                                 placeHolder="Search for name or email..."/>
                    <nav className="list-group list-group-flush mb-n6">
                        {allUsers.map((user, i) => {
                            var groupNameHtml = (currentFirstIndexName !== user.name.charAt(0))
                                ? <div className="mb-6">
                                    <small className="text-uppercase">{user.name.charAt(0)}</small>
                                </div>
                                : null
                            let isInGroup = false;
                            currentFirstIndexName = user.name.charAt(0)
                            return (
                                <>
                                    {groupNameHtml}
                                    {usersChannel.map((userChannel) => {
                                        if (userChannel.id === user.id) {
                                            isInGroup = true
                                            return (<IsInGroup user={user} i={i}/>)
                                        }
                                    })}
                                    {!isInGroup && <NotInGroup user={user} i={i}/>}
                                </>
                            )
                        })}
                    </nav>
                </div>

                <div className="modal-footer">
                    <button onClick={hide} type="button" className="btn btn-warning d-flex align-items-center">
                        Cancel
                    </button>
                    <Button type="submit" className="btn btn-primary d-flex align-items-center"
                            disabled={processing}>
                        <span className="mr-3">Invite friend</span>
                        <i className="fe-user-plus ml-auto"></i>
                    </Button>
                </div>
            </form>
        </BaseModal>
    </AddUsersToGroupContext.Provider>)
}

const IsInGroup = ({user, i}) => {
    const {keyword} = useContext(AddUsersToGroupContext);
    return (
        <div className="card mb-4" key={i}>
            <div className="card-body">

                <div className="media opacity-50">
                    <UserAvatar
                        user={user}
                        isOnline={false}
                        className="mr-5"
                    />

                    <div
                        className="media-body overflow-hidden align-self-center">
                        <h6 className="mb-0 text-truncate">
                            <Highlighter
                                highlightClassName="highlighted-text"
                                searchWords={[keyword]}
                                autoEscape={true}
                                textToHighlight={user.name}
                            />
                        </h6>
                        <small
                            className="text-truncate text-muted ">
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
                                id={`id-update-group-user-${i}`}
                                name='users[]'
                                checked
                                onClick={() => {
                                    return false
                                }}
                            />
                            <label className="custom-control-label"
                                   htmlFor={`id-update-group-user-${i}`}></label>
                        </div>
                    </div>
                </div>

            </div>

            <label className="stretched-label"
                   htmlFor={`id-update-group-user-${i}`}></label>
        </div>
    )
}
const NotInGroup = ({user, i}) => {
    const {handleCheckboxChange, keyword, isInGroup} = useContext(AddUsersToGroupContext);
    return (
        <div className="card mb-4" key={i}>
            <div className="card-body">

                <div className="media">
                    <UserAvatar
                        user={user}
                        isOnline={false}
                        className="mr-5"
                    />

                    <div
                        className="media-body overflow-hidden align-self-center">
                        <h6 className="mb-0 text-truncate">
                            <Highlighter
                                highlightClassName="highlighted-text"
                                searchWords={[keyword]}
                                autoEscape={true}
                                textToHighlight={user.name}
                            />
                        </h6>
                        <small
                            className="text-truncate text-muted ">
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
                                id={`id-update-group-user-${i}`}
                                name='users[]'
                                value={user.id}
                                onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)}
                            />
                            <label className="custom-control-label"
                                   htmlFor={`id-update-group-user-${i}`}></label>
                        </div>
                    </div>
                </div>

            </div>

            <label className="stretched-label"
                   htmlFor={`id-update-group-user-${i}`}></label>
        </div>
    )
}
export default React.memo(AddUsersToGroup);
