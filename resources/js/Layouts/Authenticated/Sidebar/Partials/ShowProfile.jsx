import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link} from "@inertiajs/react";

export default function ShowProfile({user}){
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
                                        <span>{user.name.charAt(0)}</span>
                                    </div>
                                    <h5>{user.name}</h5>
                                    <p className="text-muted">{user.bio}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-6">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item px-0 py-6">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="small text-muted mb-1">Email</p>
                                                <p className="text-muted px-3"> {user.email}</p>
                                            </div>
                                            <i className="text-muted icon-sm fe-mail"></i>
                                        </div>
                                    </li>

                                    <li className="list-group-item px-0 py-6">
                                        <div className="media align-items-center">
                                            <div className="media-body">
                                                <p className="small text-muted mb-1">Participation time</p>
                                                <p className="text-muted px-3">{user.time}</p>
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
                                <Link method="post" href={route('logout')} as="button"
                                      className="btn btn-lg btn-block btn-basic d-flex align-items-center">
                                    Log Out
                                    <span className="fe-log-out ml-auto"></span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
