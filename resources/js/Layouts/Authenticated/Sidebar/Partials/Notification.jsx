
export default function Notification({}){
    return (
        <div className="tab-pane fade h-100" id="tab-content-noti" role="tabpanel">
            <div className="d-flex flex-column h-100">

                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Notifications</h2>

                        <form className="mb-6">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Search for notifications..." aria-label="Search for notifications..." />
                                    <div className="input-group-append">
                                        <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit">
                                            <i className="fe-search"></i>
                                        </button>
                                    </div>
                            </div>
                        </form>

                        <div className="card mb-6">
                            <div className="card-body">

                                <div className="media align-items-center">
                                    <div className="mr-5">
                                        <img src="" className="fill-primary" data-inject-svg="" alt="" style={{height: "46px", width: "46px"}} />
                                    </div>
                                    <div className="media-body">
                                        <h5 className="mb-0">
                                            <a href="documentation\index.html" className="text-basic-inverse stretched-link">Documentation</a>
                                        </h5>
                                        <p>Quick setup and build tools.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <h5 className="my-6">Chat Pages:</h5>

                        <div className="card mb-6">
                            <img className="card-img-top" alt="" src="" />
                                <div className="card-body border-top">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="mb-0">Light mode</h5>
                                        </div>
                                        <div className="align-self-center">
                                            <a href="demo-light\index.htm" className="text-muted stretched-link">
                                                <i className="fe-link"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className="card mb-6">
                            <img className="card-img-top" alt="" src="" />
                                <div className="card-body border-top">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="mb-0">Dark mode</h5>
                                        </div>
                                        <div className="align-self-center">
                                            <a href="demo-dark\index.htm" className="text-muted stretched-link">
                                                <i className="fe-link"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <h5 className="my-6">Account Pages:</h5>

                        <div className="card mb-6">
                            <img className="card-img-top" alt="" src="" />
                                <div className="card-body border-top">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="mb-0">Sign In</h5>
                                        </div>
                                        <div className="align-self-center">
                                            <a href="signin.html" className="text-muted stretched-link">
                                                <i className="fe-link"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className="card mb-6">
                            <img className="card-img-top" alt="" src="" />
                                <div className="card-body border-top">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="mb-0">Sign Up</h5>
                                        </div>
                                        <div className="align-self-center">
                                            <a href="signup.html" className="text-muted stretched-link">
                                                <i className="fe-link"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className="card mb-6">
                            <img className="card-img-top" alt="" src="" />
                                <div className="card-body border-top">
                                    <div className="media">
                                        <div className="media-body">
                                            <h5 className="mb-0">Password Reset</h5>
                                        </div>
                                        <div className="align-self-center">
                                            <a href="password-reset.html" className="text-muted stretched-link">
                                                <i className="fe-link"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
