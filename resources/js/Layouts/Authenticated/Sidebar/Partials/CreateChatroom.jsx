import React, {useState, useEffect} from "react";
function CreateChatRoom({startUp}) {
    const [keyword, setKeyword] = useState('')
    const [data, setData] = useState([]);
    const getUsers = () => {
        fetch(route('user.index', {keyword : keyword}))
            .then((e) => {
                return e.json()
            })
            .then((data) => {
                setData(data.data)
            })
    }
    useEffect(() => {
        getUsers();
    }, [keyword])
    return (
        <div className={"tab-pane fade h-100 " +(startUp && "show active")} id="tab-content-create-chat" role="tabpanel">
            <div className="d-flex flex-column h-100">

                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Create group</h2>

                        <ul className="nav nav-tabs nav-justified mb-6" role="tablist">
                            <li className="nav-item">
                                <a href="#create-group-details" className="nav-link active" data-toggle="tab" role="tab" aria-selected="true">Details</a>
                            </li>

                            <li className="nav-item">
                                <a href="#create-group-members" className="nav-link" data-toggle="tab" role="tab" aria-selected="false">Members</a>
                            </li>
                        </ul>

                        <div className="tab-content" role="tablist">

                            <div id="create-group-details" className="tab-pane fade show active" role="tabpanel">
                                <form action="#">

                                    <div className="form-group">
                                        <label className="small" htmlFor="new-chat-title">Name</label>
                                        <input className="form-control form-control-lg" name="new-chat-title" id="new-chat-title" type="text" placeholder="Group Name" />
                                    </div>

                                    <div className="form-group">
                                        <label className="small" htmlFor="new-chat-topic">Topic (optional)</label>
                                        <input className="form-control form-control-lg" name="new-chat-topic" id="new-chat-topic" type="text" placeholder="Group Topic" />
                                    </div>

                                    <div className="form-group mb-0">
                                        <label className="small" htmlFor="new-chat-description">Description</label>
                                        <textarea className="form-control form-control-lg" name="new-chat-description" id="new-chat-description" rows="6" placeholder="Group Description"></textarea>
                                    </div>

                                </form>
                            </div>

                            <div id="create-group-members" className="tab-pane fade" role="tabpanel">
                                <div className="input-group">
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

                                    <div className="mb-6">
                                        <small className="text-uppercase">A</small>
                                    </div>
                                    {data.map((e, i) => {
                                        return (
                                            <div className="card mb-6">
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
                                                                <input className="custom-control-input" id="id-user-1"
                                                                       type="checkbox"/>
                                                                <label className="custom-control-label"
                                                                       htmlFor="id-user-1"></label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <label className="stretched-label" htmlFor="id-user-1"></label>
                                            </div>
                                        )
                                    })}
                                </nav>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="pb-6">
                    <div className="container-fluid">
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Create group</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateChatRoom
