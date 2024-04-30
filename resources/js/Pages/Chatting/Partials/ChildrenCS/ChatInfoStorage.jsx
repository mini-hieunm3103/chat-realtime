import React, {createContext, useContext, useEffect, useState} from "react";
import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";
import Media from "@/Pages/Chatting/Partials/ChildrenCS/Storage/Media.jsx";
import Documents from "@/Pages/Chatting/Partials/ChildrenCS/Storage/Documents.jsx";
import Links from "@/Pages/Chatting/Partials/ChildrenCS/Storage/Links.jsx";

const ChatInfoStorage = ({channelId, targetMediaTabId, setTargetMediaTabId}) => {
    return (
        <BaseChatSidebar.ChildrenCS childrenCSId="render-chat-info-storage">
            <BaseChatSidebar.Header>
                <ul className="nav justify-content-between align-items-center">
                    <li className="nav-item">
                        <BaseChatSidebar.CloseCurrentCS
                            className="nav-link text-muted px-0"
                        >
                            <i className="icon-md fe-chevron-left"></i>
                        </BaseChatSidebar.CloseCurrentCS>
                    </li>

                    <li className="text-center d-block ">
                        <h5 className="text-muted">Media, documents, links</h5>
                    </li>

                    <li className="nav-item invisible">
                        <i className="icon-md fe-x"></i>
                    </li>
                </ul>

            </BaseChatSidebar.Header>
            <BaseChatSidebar.Footer>
                <ul className="nav nav-tabs nav-justified bg-light rounded-0 mb-4" role="tablist">
                    <li className="nav-item cursor-pointer" onClick={() => {
                        setTargetMediaTabId("render-chat-info-storage-media")
                    }}>
                        <div
                            className={"nav-link " + (targetMediaTabId === "render-chat-info-storage-media" ? "active" : null)}>Media
                        </div>
                    </li>
                    <li className="nav-item cursor-pointer" onClick={() => {
                        setTargetMediaTabId("render-chat-info-storage-documents")
                    }}>
                        <div
                            className={"nav-link " + (targetMediaTabId === "render-chat-info-storage-documents" ? "active" : null)}>Documents
                        </div>
                    </li>
                    <li className="nav-item cursor-pointer" onClick={() => {
                        setTargetMediaTabId("render-chat-info-storage-links")
                    }}>
                        <div
                            className={"nav-link " + (targetMediaTabId === "render-chat-info-storage-links" ? "active" : null)}>Links
                        </div>
                    </li>
                </ul>
            </BaseChatSidebar.Footer>
            <BaseChatSidebar.Body className="border-bottom">
                <div className="container-fluid">
                    <Media channelId={channelId} targetMediaTabId={targetMediaTabId}/>
                    <Documents channelId={channelId} targetMediaTabId={targetMediaTabId}/>
                    <Links channelId={channelId} targetMediaTabId={targetMediaTabId}/>
                </div>
            </BaseChatSidebar.Body>
        </BaseChatSidebar.ChildrenCS>
    )
}


export default React.memo(ChatInfoStorage)
