import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";
import Dropdown from "@/Components/Dropdown/Dropdown.jsx";
import GalleryCS from "@/Pages/Chatting/Partials/DM/ChildrenCS/GalleryCS.jsx";
import {asset} from "@/Helper/functions.js";
import FilesCS from "@/Pages/Chatting/Partials/DM/ChildrenCS/FilesCS.jsx";
import LinkCS from "@/Pages/Chatting/Partials/DM/ChildrenCS/LinkCS.jsx";

export default function ChatSidebar({other, open, toggleOpen}) {
    if(!other) {
        return null
    }
    return (
        <BaseChatSidebar isOpenCS={open} hide={toggleOpen}>
            <BaseChatSidebar.MainCS chatSidebarId="chat-info">
                <BaseChatSidebar.Header>
                    <ul className="nav justify-content-between align-items-center">
                        <li className="nav-item list-inline-item d-lg-none ">
                            <div className="nav-link text-muted px-0" onClick={toggleOpen}>
                                <i className="icon-md fe-chevron-left"></i>
                            </div>
                        </li>
                    </ul>
                </BaseChatSidebar.Header>
                <BaseChatSidebar.Body>
                    <div className="container-fluid p-0">
                        <div className="card mb-3 ml-0 border-0 rounded-0">
                            <div className="text-center pb-9 pt-0 px-10">
                                <UserAvatar
                                    user={other}
                                    size="xl"
                                    showProfile={true}
                                    className=" mx-5 mb-5"

                                />
                                <h5>{other.name}</h5>

                                <p className="text-muted">{other.bio}</p>
                            </div>
                        </div>

                        <div className="card mb-3 ml-0 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <div className="media-body">
                                            <p className=" h5 small text-muted mb-0">Turn Off
                                                Notifications</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-bell"></i>
                                    </div>
                                </li>

                                <li className="list-group-item py-2">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <div className="media-body">
                                            <p className=" h5 small text-muted mb-0">Turn Off
                                                Notifications</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-bell"></i>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <div className="media-body">
                                            <p className=" h5 small text-muted mb-0">Same Group: </p>
                                        </div>
                                        <i className="text-muted icon-sm fe-users"></i>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center" style={{height: 45}}>
                                        <div className="media-body">
                                            <p className=" h5 small text-muted mb-0">Turn Off
                                                Notifications</p>
                                        </div>
                                        <i className="text-muted icon-sm fe-bell"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/*Gallery*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open targetId="user-social">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center" style={{height: 45}}>
                                                <div className="media-body">
                                                    <p className=" h5 small text-muted mb-0" style={{fontWeight: "bold"}}>Pictures/Videos</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-chevron-down"></i>
                                            </div>
                                        </li>
                                    </Dropdown.Open>
                                    <Dropdown.Content>
                                        <ul className="list-group list-group-flush">
                                            <div className="d-flex flex-wrap justify-content-around">
                                                <div className="media-store">
                                                    <div className="px-3 py-3">
                                                        <img style={{height: 70, width: 70}}
                                                             loading="lazy"
                                                             src={asset("images/neom-brFQojtwSzE-unsplash.jpg")}
                                                             alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                            <BaseChatSidebar.TriggerChildrenCS
                                                childrenCSId="render-img"
                                                className="nav nav-pills nav-justified bg-light border-0 rounded-0 px-5 py-5 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0">
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.TriggerChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                        {/*Files*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open targetId="user-social">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center" style={{height: 45}}>
                                                <div className="media-body">
                                                    <p className=" h5 small text-muted mb-0"
                                                       style={{fontWeight: "bold"}}>Files</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-chevron-down"></i>
                                            </div>
                                        </li>
                                    </Dropdown.Open>
                                    <Dropdown.Content>
                                        <ul className="list-group list-group-flush list-group-no-border-first">

                                            <li className="list-group-item py-6">
                                                <div className="media">

                                                    <div className="icon-shape bg-primary text-white mr-5">
                                                        <i className="fe-paperclip"></i>
                                                    </div>

                                                    <div className="media-body align-self-center overflow-hidden">
                                                        <h6 className="text-truncate mb-0">
                                                            <a href="#" className="text-reset"
                                                               title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>
                                                        </h6>

                                                        <ul className="list-inline d-flex justify-content-between small mb-0">
                                                            <li className="list-inline-item">
                                                                <span className="text-muted">79.2 KB</span>
                                                            </li>
                                                            <li className="list-inline-item r">
                                                                <span className="text-muted text-uppercase">Mar 10 2024 16:42</span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div className="align-self-center ml-5">
                                                        <div className="dropdown">
                                                            <a href="#"
                                                               className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                               data-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                                <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Download <span
                                                                    className="ml-auto fe-download"></span>
                                                                </a>
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Share <span className="ml-auto fe-share-2"></span>
                                                                </a>
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Delete <span className="ml-auto fe-trash-2"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            <BaseChatSidebar.TriggerChildrenCS
                                                childrenCSId="render-files"
                                                className="nav nav-pills nav-justified bg-light border-0 rounded-0 px-5 py-5 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0">
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.TriggerChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                        {/*Links*/}
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open targetId="user-social">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center" style={{height: 45}}>
                                                <div className="media-body">
                                                    <p className=" h5 small text-muted mb-0"
                                                       style={{fontWeight: "bold"}}>Links</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-chevron-down"></i>
                                            </div>
                                        </li>
                                    </Dropdown.Open>
                                    <Dropdown.Content>
                                        <ul className="list-group list-group-flush list-group-no-border-first">

                                            <li className="list-group-item py-6">
                                                <div className="media">

                                                    <div className="icon-shape bg-primary text-white mr-5">
                                                        <i className="fe-paperclip"></i>
                                                    </div>

                                                    <div className="media-body align-self-center overflow-hidden">
                                                        <h6 className="text-truncate mb-0">
                                                            <a href="#" className="text-reset"
                                                               title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">Title của link</a>
                                                        </h6>

                                                        <ul className="list-inline d-flex justify-content-between small mb-0">
                                                            <li className="list-inline-item">
                                                                <span className="text-muted">facebook.com</span>
                                                            </li>
                                                            <li className="list-inline-item ">
                                                                <span className="text-muted text-uppercase">Mar 10 2024 16:42</span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div className="align-self-center ml-5">
                                                        <div className="dropdown">
                                                            <a href="#"
                                                               className="btn btn-sm btn-ico btn-link text-muted w-auto"
                                                               data-toggle="dropdown" aria-haspopup="true"
                                                               aria-expanded="false">
                                                                <i className="fe-more-vertical"></i>
                                                            </a>
                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item d-flex align-items-center"
                                                                   href="#">
                                                                    Copy <span
                                                                    className="ml-auto fe-copy"></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            <BaseChatSidebar.TriggerChildrenCS
                                                childrenCSId="render-links"
                                                className="nav nav-pills nav-justified bg-light border-0 rounded-0 px-5 py-5 card-bg-color">
                                                <button className="nav-item btn btn-secondary rounded-0">
                                                    Show All
                                                </button>
                                            </BaseChatSidebar.TriggerChildrenCS>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                        <div className="card mb-3 border-0 rounded-0">
                            <ul className="list-group list-group-flush">
                                <Dropdown dropdownId="user-social">
                                    <Dropdown.Open targetId="user-social">
                                        <li className="list-group-item py-2">
                                            <div className="media align-items-center" style={{height: 45}}>
                                                <div className="media-body">
                                                    <p className=" h5 small text-muted mb-0"
                                                       style={{fontWeight: "bold"}}>Security</p>
                                                </div>
                                                <i className="text-muted icon-sm fe-chevron-down"></i>
                                            </div>
                                        </li>
                                    </Dropdown.Open>
                                    <Dropdown.Content>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item py-6">
                                                <a href="#" className="media text-danger">
                                                    <div className="media-body align-self-center">
                                                        Delete This Conversation
                                                    </div>
                                                    <i className="icon-sm fe-trash"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                    </div>
                </BaseChatSidebar.Body>
            </BaseChatSidebar.MainCS>
            <GalleryCS/>
            <FilesCS/>
            <LinkCS/>
        </BaseChatSidebar>
    )
}
