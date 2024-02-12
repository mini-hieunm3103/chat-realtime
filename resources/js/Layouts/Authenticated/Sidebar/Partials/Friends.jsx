import React from "react";

function Friends(){
    return (
        <div className="tab-pane fade h-100" id="tab-content-friends" role="tabpanel">
            <div className="d-flex flex-column h-100">

                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Friends</h2>

                        <form className="mb-6">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Search for messages or users..." aria-label="Search for messages or users..." />
                                <div className="input-group-append">
                                    <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit">
                                        <i className="fe-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <button type="button" className="btn btn-lg btn-block btn-secondary d-flex align-items-center mb-6" data-toggle="modal" data-target="#invite-friends">
                            Invite friends
                            <i className="fe-users ml-auto"></i>
                        </button>

                        <nav className="mb-n6">

                            <div className="mb-6">
                                <small className="text-uppercase">A</small>
                            </div>

                            <div className="card mb-6">
                                <div className="card-body">

                                    <div className="media">

                                        <div className="avatar avatar-online mr-5">
                                            <img className="avatar-img" src="" alt="Anna Bridges" />
                                        </div>


                                        <div className="media-body align-self-center">
                                            <h6 className="mb-0">Anna Bridges</h6>
                                            <small className="text-muted">Online</small>
                                        </div>

                                        <div className="align-self-center ml-5">
                                            <div className="dropdown z-index-max">
                                                <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fe-more-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                                        New chat <span className="ml-auto fe-edit-2"></span>
                                                    </a>
                                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                                        Delete <span className="ml-auto fe-trash-2"></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <a href="/inbox-1" className="stretched-link"></a>
                                </div>
                            </div>
                        </nav>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default Friends;
