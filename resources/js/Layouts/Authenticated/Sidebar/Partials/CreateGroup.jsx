import React, {useEffect, useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import TextareaInput from "@/Components/TextareaInput.jsx";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import Swal from "sweetalert2";
import {useGetUsers} from "@/Helper/hooks.js";
import UserAvatar from "@/Components/UserAvatar.jsx";
import Highlighter from "react-highlight-words";

function CreateGroup({startUp}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        topic: '',
        description: '',
        users: []
    });
    const [usersPostData, setUsersPostData] = useState([]);
    const [keyword, setKeyword] = useState('');
    const allUsers = useGetUsers()(keyword);
    var currentFirstIndexName = null

    const handleCheckboxChange = (userId, isChecked) => {
        if(isChecked) {
            setUsersPostData(prevState => [...prevState, userId])
        } else {
            setUsersPostData(prevState => prevState.filter(id=> id!== userId))
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
    return (
        <div className={"tab-pane fade h-100 " + (startUp && "show active")} id="tab-content-create-chat"
             role="tabpanel">
            <form onSubmit={createChatroom} className="d-flex flex-column h-100">
                <div className="hide-scrollbar">
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
                                <div className="input-group mb-6">
                                    <TextInput
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="Search for name or email..."
                                        aria-label="Search for name or email..."
                                    />

                                    <div className="input-group-append">
                                        <div className="btn btn-lg btn-ico btn-secondary btn-minimal">
                                            <i className="fe-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <nav className="list-group list-group-flush mb-n6">
                                    {(errors.users) &&
                                        <>
                                            <div className="alert alert-danger" role="alert">
                                                {errors.users}
                                            </div>
                                        </>
                                    }
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
                                                                isOnline={(user.online === 1)}
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
                                                                        id={`id-user-${i}`}
                                                                        name = 'users[]'
                                                                        value = {user.id}
                                                                        onChange={(e) => handleCheckboxChange(e.target.value, e.target.checked)}
                                                                    />
                                                                    <label className="custom-control-label"
                                                                           htmlFor={`id-user-${i}`}></label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <label className="stretched-label" htmlFor={`id-user-${i}`}></label>
                                                </div>
                                            </>
                                        )
                                    })}
                                </nav>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="pb-6">
                    <div className="container-fluid" style={{zIndex: 99}}>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Create group</button>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default CreateGroup
