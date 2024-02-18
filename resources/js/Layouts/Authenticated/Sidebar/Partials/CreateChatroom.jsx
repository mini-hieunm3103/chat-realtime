import React, {useEffect, useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import TextareaInput from "@/Components/TextareaInput.jsx";

function CreateChatRoom({startUp}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        topic: '',
        description: ''
    });
    const [keyword, setKeyword] = useState('')
    const [users, setUsers] = useState([]);
    var currentFirstIndexName = null
    const getUsers = () => {
        fetch(route('user.index', {keyword : keyword}))
            .then((e) => {
                return e.json()
            })
            .then((users) => {
                setUsers(users.data)
            })
    }
    useEffect(() => {
        getUsers();
    }, [keyword])
    const createChatroom = (e) => {
        e.preventDefault();
        post(route('chatroom.store'))
    }
    return (
        <div className={"tab-pane fade h-100 " + (startUp && "show active")} id="tab-content-create-chat"
             role="tabpanel">
            <form onSubmit={createChatroom} className="d-flex flex-column h-100">
                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Create group</h2>

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
                                    <InputLabel htmlFor="name" value="Name" className="small"/>

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        error={errors.name}
                                        autoComplete="name"
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
                                        autoComplete="topic"
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
                                    <input type="text" className="form-control form-control-lg"
                                           value={keyword}
                                           onChange={(e) => setKeyword(e.target.value)}
                                           placeholder="Search for name or email..."
                                           aria-label="Search for name or email..."/>
                                    <div className="input-group-append">
                                        <button className="btn btn-lg btn-ico btn-secondary btn-minimal"
                                                type="submit">
                                            <i className="fe-search"></i>
                                        </button>
                                    </div>
                                </div>
                                <nav className="list-group list-group-flush mb-n6">
                                    {users.map((e, i) => {
                                        var groupNameHtml = (currentFirstIndexName  !== e.name.charAt(0))
                                            ? <div className="mb-6">
                                                <small className="text-uppercase">{e.name.charAt(0)}</small>
                                            </div>
                                            : null
                                        currentFirstIndexName = e.name.charAt(0)
                                        return (
                                            <>
                                                {groupNameHtml}
                                                <div className="card mb-4">
                                                    <div className="card-body">

                                                        <div className="media">

                                                            <div
                                                                className="avatar avatar-online mr-5 bg-primary text-white">
                                                                <span>{e.name.charAt(0)}</span>
                                                            </div>

                                                            <div className="media-body align-self-center">
                                                                <h6 className="mb-0">{e.name}</h6>
                                                                <small
                                                                    className="text-muted text-truncate">{e.email}</small>
                                                            </div>

                                                            <div className="align-self-center ml-auto">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input className="custom-control-input"
                                                                           id={`id-user-${i}`}
                                                                           type="checkbox"/>
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

export default CreateChatRoom
