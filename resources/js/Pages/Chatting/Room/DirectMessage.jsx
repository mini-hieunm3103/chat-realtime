import {useEffect, useState} from "react";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import { isOnline} from "@/Helper/functions.js";
import UserAvatar from "@/Components/UserAvatar.jsx";
import IsTyping from "@/Pages/Chatting/Partials/IsTyping.jsx";
import Message from "@/Pages/Chatting/Partials/Message.jsx";
import ChatSidebar from "@/Pages/Chatting/Partials/DM/Chatsidebar.jsx";
import useChatSidebar from "@/Helper/useChatSidebar.jsx";
import {Head} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown/Dropdown.jsx";


function DirectMessage({channelId, auth, usersChannel}){
    const [listMessages, setListMessages] = useState([])
    const [allData, setAllData] = useState([])
    const [hasMessage, setHasMessage] = useState(true)
    const [searchMessage, setSearchMessage] = useState(null)
    const {open, toggleOpen} = useChatSidebar()
    const other = usersChannel.find((e) => {
        return e.id !== auth.id
    })
    const loadListMessages = () => {
        fetch(route('message.getMessages', {channel_id: channelId}))
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setHasMessage(data.meta.total > 0)
                if (data.meta.total > 0) {
                    setAllData(data)
                    setListMessages(data.data)
                }
            })
            .catch(err=> {
                console.log(err)})
    }
    useEffect(() => {
        loadListMessages()
    }, []);
    return (
        <>
            <Head title={other.name} />
            <div id="chat-2" className="chat dropzone-form-js" data-dz-url="some.php">

                <div className="chat-body">

                    <div className="chat-header border-bottom py-4 py-lg-6 px-lg-8">
                        <div className="container-xxl">

                            <div className="row align-items-center">

                                <div className="col-3 d-xl-none">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item">
                                            <a className="text-muted px-0" href="#" data-chat="open">
                                                <i className="icon-md fe-chevron-left"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-6 col-xl-6">
                                    <div className="media text-center text-xl-left">
                                        <UserAvatar
                                            user={other}
                                            showProfile={true}
                                            isOnline={isOnline(other.id)}
                                            className=" d-none d-lg-inline-block mr-5 "
                                            size="sm"
                                        />
                                        <div className="media-body align-self-center text-truncate">
                                            <h6 className="text-truncate mb-n1">{other.name}</h6>
                                            {other.online &&
                                                <span
                                                    className="badge badge-dot badge-success d-inline-block d-xl-none mr-1"></span>}
                                            <small
                                                className="text-muted">{(other.online) ? "Online" : "Offline"}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-3 col-xl-6 text-right">
                                    <ul className="nav justify-content-end">
                                        <li className="nav-item list-inline-item d-none d-xl-block mr-3">
                                            <a className="nav-link text-muted px-3" data-toggle="collapse"
                                               data-target="#chat-2-search" href="#" title="Search this chat">
                                                <i className="icon-md fe-search"></i>
                                            </a>
                                        </li>

                                        <li className="nav-item list-inline-item d-none d-xl-block mr-0">
                                            <div className="nav-link text-muted px-3" onClick={toggleOpen}>
                                                <i className="icon-md fe-more-vertical"></i>
                                            </div>

                                        </li>
                                        {/*Mobile*/}
                                        <li className="nav-item list-inline-item d-block d-xl-none">
                                            <div className="dropdown">
                                                <a className="nav-link text-muted px-0" href="#" data-toggle="dropdown"
                                                   aria-haspopup="true" aria-expanded="false">
                                                    <i className="icon-md fe-more-vertical"></i>
                                                </a>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item d-flex align-items-center"
                                                       data-toggle="collapse" data-target="#chat-2-search" href="#">
                                                        Search <span className="ml-auto pl-5 fe-search"></span>
                                                    </a>
                                                    <div className="dropdown-item d-flex align-items-center"
                                                         onClick={toggleOpen}>
                                                        Chat Info <span
                                                        className="ml-auto pl-5 fe-more-horizontal"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="collapse border-bottom px-lg-8" id="chat-2-search">
                        <div className="container-xxl py-4 py-lg-6">
                            <SearchInput
                                keyword={searchMessage}
                                setKeyword={setSearchMessage}
                                placeHolder="Search this chat"
                            />
                        </div>
                    </div>

                    <div className="chat-content px-lg-8">
                        <div className="container-xxl py-6 py-lg-10">

                            <div className="message-divider my-9 mx-lg-5">
                                <div className="row align-items-center">

                                    <div className="col">
                                        <hr/>
                                    </div>

                                    <div className="col-auto">
                                        <small className="text-muted">Today</small>
                                    </div>

                                    <div className="col">
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                            {listMessages.map((message, i) => {
                                return (<Message authId={auth.id} message={message} keyword={searchMessage}/>)
                            })}
                            <IsTyping other={other}/>
                        </div>

                        <div className="end-of-chat"></div>
                    </div>

                    <div className="chat-files hide-scrollbar px-lg-8">
                        <div className="container-xxl">
                            <div className="dropzone-previews-js form-row py-4"></div>
                        </div>
                    </div>

                    <div id="chat-id-2-form" className="chat-footer border-top py-4 py-lg-6 px-lg-8">
                        <div className="container-xxl">
                            <form action="assets/php/upload.php" data-emoji-form="">
                                <div className="form-row align-items-center">
                                    <div className="col">
                                        <div className="input-group">

                                            <textarea id="chat-id-2-input"
                                                      className="form-control bg-transparent border-0"
                                                      placeholder="Type your message..." rows="1" data-emoji-input=""
                                                      data-autosize="true"></textarea>

                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
                                                    type="button" data-emoji-btn="">
                                                    <img src="" data-inject-svg="" alt=""/>
                                                </button>
                                            </div>

                                            <div className="input-group-append">
                                                <button id="chat-upload-btn-2"
                                                        className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js"
                                                        type="button">
                                                    <img src="" data-inject-svg="" alt=""/>
                                                </button>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-auto">
                                        <button className="btn btn-ico btn-primary rounded-circle" type="submit">
                                            <span className="fe-send"></span>
                                        </button>
                                    </div>

                                </div>

                            </form>

                        </div>
                    </div>
                </div>
                <ChatSidebar other={other} open={open} toggleOpen={toggleOpen} />
            </div>

        </>

    )

}

export default DirectMessage;
