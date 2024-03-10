// render message
import UserAvatar from "@/Components/UserAvatar.jsx";
import {isOnline} from "@/Helper/functions.js";
import DropdownMessage from "@/Pages/Chatting/Partials/DropdownMessage.jsx";
import Highlighter from "react-highlight-words";
import React from "react";

export default function OtherMessage({message, keyword}){
    // console.log(message)
    const other = message.user;
    return (
        <div className="message">
            {/*<a className="avatar avatar-sm mr-4 mr-lg-5" href="#" data-chat-sidebar-toggle="#chat-2-info">*/}
            {/*    <img className="avatar-img" src="assets\images\avatars\10.jpg" alt="" />*/}
            {/*</a>*/}
            <UserAvatar
                user={other}
                isOnline={isOnline(other.id)}
                size="sm"
                className=" mr-4 mr-lg-5 "
            />
            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex align-items-center">

                        <div className="message-content bg-light">
                            <div>
                                <Highlighter
                                    highlightClassName="highlighted-text"
                                    searchWords={[keyword]}
                                    autoEscape={true}
                                    textToHighlight={message.content}
                                />
                            </div>

                            <div className="mt-1">
                                <small className="opacity-65">8 mins ago</small>
                            </div>
                        </div>
                        <DropdownMessage/>
                    </div>
                </div>
            </div>
        </div>
    )
}
