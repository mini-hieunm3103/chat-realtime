import React, {useState, useEffect} from "react";
import useGetUsers from "@/Helper/useGetUsers.jsx";
export default function Dialog({startUp}){
    const [keyword, setKeyword] = useState('')
    const allUsers = useGetUsers()(keyword,true);
    return (
        <div className={"tab-pane fade h-100 " +(startUp && "show active")} id="tab-content-dialogs" role="tabpanel">
            <div className="d-flex flex-column h-100">

                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Chats</h2>

                        <div className="input-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Search for name or group..." aria-label="Search for name or group..." />
                            <div className="input-group-append">
                                <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit">
                                    <i className="fe-search"></i>
                                </button>
                            </div>
                        </div>

                        <div className="text-center hide-scrollbar d-flex my-7" data-horizontal-scroll="">
                            {
                                allUsers.map((e, i)=>{
                                    return (
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <div className="avatar mb-3 avatar-online bg-primary text-white">
                                                <span>{e.name.charAt(0)}</span>
                                            </div>
                                            <div className="small">{e.name}</div>
                                        </a>
                                    )
                                })
                            }

                        </div>

                        <nav className="nav d-block list-discussions-js mb-n6">
                            <a className="text-reset nav-link p-0 mb-3" href="/chatroom-1">
                                <div className="card card-active-listener">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="avatar mr-5  avatar-offline bg-primary text-white">
                                                <span>DG</span>
                                            </div>
                                            <div className="media-body overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h6 className="text-truncate mb-0 mr-auto">Bootstrap Themes</h6>
                                                    <p className="small text-muted text-nowrap ml-4">10:42 am</p>
                                                </div>
                                                <div className="text-truncate">Anna Bridges: Hey, Maher! How are you?
                                                    The weather is great isn't it?
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="badge badge-circle badge-primary badge-border-light badge-top-right">
                                        <span>3</span>
                                    </div>
                                </div>
                            </a>
                            <a className="text-reset nav-link p-0 mb-3" href="/inbox-1">
                                <div className="card card-active-listener">
                                    <div className="card-body">
                                        <div className="media">
                                            <div className="avatar mr-5 avatar-online bg-primary text-white">
                                                <span>A</span>
                                            </div>
                                            <div className="media-body overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h6 className="text-truncate mb-0 mr-auto">Anna Bridges</h6>
                                                    <p className="small text-muted text-nowrap ml-4">10:42 am</p>
                                                </div>
                                                <div className="text-truncate">is typing<span className='typing-dots'><span>.</span><span>.</span><span>.</span></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
