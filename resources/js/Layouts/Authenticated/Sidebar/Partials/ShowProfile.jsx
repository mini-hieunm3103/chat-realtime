export default function ShowProfile({user}){
    console.log(user)
    return (
        <div className="tab-pane fade h-100" id="tab-content-user" role="tabpanel">
            <div className="d-flex flex-column h-100">

                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Profile</h2>

                        <div className="card mb-6">
                            <div className="card-body">
                                <div className="text-center py-6">
                                    <div className="avatar avatar-xl mb-5 avatar-online bg-primary text-white">
                                        <span>A</span>
                                    </div>
                                    <h5>{user.name}</h5>
                                    <p className="text-muted">Bootstrap is an open source toolkit for developing web
                                        with HTML.</p>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-6">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item px-0 py-6">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="small text-muted mb-0">Country</p>
                                                <p></p>
                                            </div>
                                            <i className="text-muted icon-sm fe-globe"></i>
                                        </div>
                                    </li>

                                    <li className="list-group-item px-0 py-6">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="small text-muted mb-0">Phone</p>
                                                <p>{user.phone}</p>
                                            </div>
                                            <i className="text-muted icon-sm fe-phone"></i>
                                        </div>
                                    </li>

                                    <li className="list-group-item px-0 py-6">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="small text-muted mb-0">Email</p>
                                                <p className="text-muted"> {user.email}</p>
                                            </div>
                                            <i className="text-muted icon-sm fe-mail"></i>
                                        </div>
                                    </li>

                                    <li className="list-group-item px-0 py-6">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="small text-muted mb-0">Participation time</p>
                                                <p className="text-muted">{user.created_at}</p>
                                            </div>
                                            <i className="text-muted icon-sm fe-clock"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card mb-6">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item px-0 py-6">
                                        <a href={user.twitter} target="_blank" className="media text-muted">
                                            <div className="media-body align-self-center">
                                                Twitter
                                            </div>
                                            <i className="icon-sm fe-twitter"></i>
                                        </a>
                                    </li>

                                    <li className="list-group-item px-0 py-6">
                                        <a href={user.facebook} target="_blank" className="media text-muted">
                                            <div className="media-body align-self-center">
                                                Facebook
                                            </div>
                                            <i className="icon-sm fe-facebook"></i>
                                        </a>
                                    </li>

                                    <li className="list-group-item px-0 py-6">
                                        <a href={user.github} target="_blank" className="media text-muted">
                                            <div className="media-body align-self-center">
                                                Github
                                            </div>
                                            <i className="icon-sm fe-github"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col">
                                <a href="/settings" type="button"
                                   className="btn btn-lg btn-block btn-basic d-flex align-items-center">
                                    Settings
                                    <span className="fe-settings ml-auto"></span>
                                </a>
                            </div>

                            <div className="col">
                                <button type="button"
                                        className="btn btn-lg btn-block btn-basic d-flex align-items-center">
                                    Logout
                                    <span className="fe-log-out ml-auto"></span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
