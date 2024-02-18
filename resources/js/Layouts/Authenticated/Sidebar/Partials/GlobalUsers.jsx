import React, {useState, useEffect} from "react";

function GlobalUsers({startUp}){
    const [keyword, setKeyword] = useState('')
    const [data, setData] = useState([]);
    var currentFirstIndexName = null
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
        <div className={"tab-pane fade h-100 " +(startUp && "show active")} id="tab-content-friends" role="tabpanel">
            <div className="d-flex flex-column h-100">

                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Global Users</h2>

                        <div className="input-group mb-6">
                            <input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                type="text" className="form-control form-control-lg" placeholder="Search for name or email..." aria-label="Search for name or email..." />
                            <div className="input-group-append">
                                <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit">
                                    <i className="fe-search"></i>
                                </button>
                            </div>
                        </div>

                        <button type="button" className="btn btn-lg btn-block btn-secondary d-flex align-items-center mb-6" data-toggle="modal" data-target="#invite-friends">
                            Invite friends
                            <i className="fe-users ml-auto"></i>
                        </button>

                        <nav className="mb-n6">


                            {data.map((e, i) => {
                                var groupNameHtml = (e.name.charAt(0) !== currentFirstIndexName)
                                    ? <div className="mb-6">
                                        <small className="text-uppercase">{e.name.charAt(0)}</small>
                                    </div>
                                    : null
                                currentFirstIndexName = e.name.charAt(0)
                                return (
                                    <>
                                        {groupNameHtml}
                                        <div className="card mb-6">
                                            <div className="card-body">

                                                <div className="media">

                                                    <div className="avatar avatar-online mr-5 bg-primary text-white">
                                                        <span>{e.name.charAt(0)}</span>
                                                    </div>

                                                    <div className="media-body align-self-center">
                                                        <h6 className="mb-0">{e.name}</h6>
                                                        <small className="text-muted text-truncate">{e.email}</small>
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
                                                                    New chat <span className="ml-auto fe-edit-2"></span>
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

                                                <a href="/inbox-1" className="stretched-link"></a>
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

export default GlobalUsers;
