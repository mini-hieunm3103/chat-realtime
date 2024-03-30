import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";
import React, {useContext} from "react";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Group from "@/Pages/Chatting/Room/Group.jsx";
import {isCommunityUsersLength} from "@/Helper/config.js";
export default function GroupSettings({}) {
    {/* just owner and admins can change this site*/}
    const {users} = useContext(Group.GroupInfoContext)
    const isAdmin = true;
    return (
        <BaseChatSidebar.ChildrenCS childrenCSId="render-group-manage" className="">
            <BaseChatSidebar.Header className="border-bottom">
                <ul className="nav justify-content-between align-items-center ">
                    <li className="nav-item">
                        <BaseChatSidebar.CloseCurrentCS
                            className="nav-link text-muted px-0"
                        >
                            <i className="icon-md fe-chevron-left"></i>
                        </BaseChatSidebar.CloseCurrentCS>
                    </li>

                    <li className="text-center d-block ">
                        <h5 className="text-muted">Manage Group</h5>
                    </li>

                    <li className="nav-item invisible">
                        <i className="icon-md fe-x"></i>
                    </li>
                </ul>

            </BaseChatSidebar.Header>
            {!isAdmin
                ? <div className="py-3 text-center" style={{backgroundColor: "rgba(0,0,0, 0.05)"}}>
                    <i className="fe-lock mr-1"></i>
                    <span className="small">Only Administrators can access these settings</span>
                </div>
                : null
            }
            <BaseChatSidebar.Body className={!isAdmin ? "position-relative" : ""}>
                <div className="container-fluid p-0">
                    <div className="py-1 bg-light"/>
                    <div className="card mb-3 mt-4 ml-0 border-0 rounded-0">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item py-2">
                                <h6 className="">Allow group member to</h6>
                            </li>
                            <li className="list-group-item py-2">
                                <div className="media align-items-center" style={{height: 45}}>
                                    <div className="media-body">
                                        <p className=" h5 small text-muted mb-0">Change group name & avatar</p>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <CheckboxInput
                                            name="changeDetails"
                                            id="checkbox-change-details"
                                            // onChange={(e) => setData('changeDetails', e.target.checked)}
                                        />
                                        <label className="custom-control-label"
                                               htmlFor="checkbox-change-details"></label>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item py-2">
                                <div className="media align-items-center" style={{height: 45}}>
                                    <div className="media-body">
                                        <p className=" h5 small text-muted mb-0">Send messages</p>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <CheckboxInput
                                            // name="changeDetails"
                                            id="checkbox-send-messages"
                                            // onChange={(e) => setData('changeDetails', e.target.checked)}
                                        />
                                        <label className="custom-control-label"
                                               htmlFor="checkbox-send-messages"></label>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item py-2">
                                <div className="media align-items-center" style={{height: 45}}>
                                    <div className="media-body">
                                        <p className=" h5 small text-muted mb-0">Create new polls</p>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <CheckboxInput
                                            // name="changeDetails"
                                            id="checkbox-create-polls"
                                            // onChange={(e) => setData('changeDetails', e.target.checked)}
                                        />
                                        <label className="custom-control-label"
                                               htmlFor="checkbox-create-polls"></label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="py-1 bg-light"/>
                    <div className="card mb-3 mt-4 ml-0 border-0 rounded-0">
                        <ul className="list-group list-group-flush">
                            {(users.length > isCommunityUsersLength && isAdmin)
                                ? <li className="list-group-item py-4 d-flex justify-content-between">
                                    <div className="d-flex align-items-center flex-wrap">
                                        <h6 className="" style={{width: "fit-content"}}>Only owner/admins are able to
                                            view full member list.</h6>
                                    </div>
                                    <div className="custom-control custom-switch pt-5">
                                        <CheckboxInput
                                            // name="changeDetails"
                                            id="switch-see-users"
                                            // onChange={(e) => setData('changeDetails', e.target.checked)}
                                        />
                                        <InputLabel className="custom-control-label" value=""
                                                    htmlFor="switch-see-users"/>
                                    </div>
                                </li>
                                : null
                            }
                            <li className="list-group-item py-4 d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <h6 className="" style={{width: "fit-content"}}>Membership approval</h6>
                                    <div className="ml-3 tooltip-custom">
                                        <i className="fe-help-circle"></i>
                                        <span className="tooltip-custom-text-120">
                                        When enabled, new members must be approved by owner or admins to join the group
                                    </span>
                                    </div>
                                </div>
                                <div className="custom-control custom-switch">
                                    <CheckboxInput
                                        // name="changeDetails"
                                        id="switch-approval"
                                        // onChange={(e) => setData('changeDetails', e.target.checked)}
                                    />
                                    <InputLabel className="custom-control-label" value="" htmlFor="switch-approval"/>
                                </div>
                            </li>
                            <li className="list-group-item py-4 d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <h6 className="" style={{width: "fit-content"}}>Highlight messages from admin</h6>
                                    <div className="ml-3 tooltip-custom">
                                        <i className="fe-help-circle"></i>
                                        <span className="tooltip-custom-text-200">
                                        When enabled, messages from owner or admin will have a key symbol.
                                    </span>
                                    </div>
                                </div>
                                <div className="custom-control custom-switch">
                                    <CheckboxInput
                                        // name="changeDetails"
                                        id="switch-highlight"
                                        // onChange={(e) => setData('changeDetails', e.target.checked)}
                                    />
                                    <InputLabel className="custom-control-label" value="" htmlFor="switch-highlight"/>
                                </div>
                            </li>
                            <li className="list-group-item pt-4 pb-0">
                                <div className=" d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <h6 className="" style={{width: "fit-content"}}>Allow joining group via
                                            link</h6>
                                        <div className="ml-3 tooltip-custom">
                                            <i className="fe-help-circle"></i>
                                            <span className="tooltip-custom-text-150">
                                        All members can invite people to join the group by sharing a link with them
                                    </span>
                                        </div>
                                    </div>
                                    <div className="custom-control custom-switch">
                                        <CheckboxInput
                                            // name="changeDetails"
                                            id="switch-use-link"
                                            // onChange={(e) => setData('changeDetails', e.target.checked)}
                                        />
                                        <InputLabel className="custom-control-label" value=""
                                                    htmlFor="switch-use-link"/>
                                    </div>
                                </div>
                                <div
                                    className="nav nav-pills nav-justified border-0 rounded-0 px-5 pb-5 pt-3 mt-3 card-bg-color">
                                    <div
                                        className="py-3 nav-item bg-secondary rounded-0 px-4 d-flex justify-content-between align-items-center">
                                        <span className="ml-2 font-weight-bold text-primary mb-1"
                                              style={{width: "fit-content"}}>
                                            {"Short link"}
                                        </span>
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button className=" btn btn-secondary py-2 px-4 mr-2">
                                                <i className="fe-copy"></i>
                                            </button>
                                            <button className=" btn btn-secondary py-2 px-4 mr-2">
                                                <i className="fe-share-2"></i>
                                            </button>
                                            <button className=" btn btn-secondary py-2 px-4">
                                                <i className="fe-refresh-ccw"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="py-1 bg-light"/>
                    {isAdmin ?
                        <div className="card mb-3 mt-4 ml-0 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <BaseChatSidebar.OpenChildrenCS
                                    childrenCSId="render-group-blocked-users"
                                >
                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center cursor-pointer" style={{height: 45}}>
                                            <i className="text-muted icon-sm fe-bell mr-4 font-weight-bold"></i>
                                            <div className="media-body">
                                                <p className=" h4 small text-muted mb-2"
                                                   style={{fontSize: "inherit"}}>Blocked
                                                    members</p>
                                            </div>
                                        </div>
                                    </li>
                                </BaseChatSidebar.OpenChildrenCS>

                                <BaseChatSidebar.OpenChildrenCS
                                    childrenCSId="render-group-admins"
                                >
                                    <li className="list-group-item py-2">
                                        <div className="media align-items-center cursor-pointer" style={{height: 45}}>
                                            <i className="fi fi-bs-key mr-4"></i>
                                            <div className="media-body">
                                                <p className="h4 small text-muted mb-2"
                                                   style={{fontSize: "inherit"}}>Owner & Admins</p>
                                            </div>
                                        </div>
                                    </li>
                                </BaseChatSidebar.OpenChildrenCS>
                            </ul>
                        </div>
                        : null
                    }
                </div>
                {!isAdmin ? <div className="not-allowed"></div> : null}
            </BaseChatSidebar.Body>
        </BaseChatSidebar.ChildrenCS>
    )
}
