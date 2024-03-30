import {createContext, useContext, useState} from "react";
import Group from "@/Pages/Chatting/Room/Group.jsx";
import BaseChatSidebar from "@/Components/ChatSidebar/BaseChatSidebar.jsx";

const ChatInfoMediaContext = createContext()
const ChatInfoMedia = ({children, targetMediaTabId, setTargetMediaTabId}) => {
    console.log("chatinfo",targetMediaTabId)
    // const {} = useContext(Group.GroupInfoContext)
    return (
        <BaseChatSidebar.ChildrenCS childrenCSId="render-chat-info-media">
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
                        <h5 className="text-muted">Media Storage</h5>
                    </li>

                    <li className="nav-item invisible">
                        <i className="icon-md fe-x"></i>
                    </li>
                </ul>

            </BaseChatSidebar.Header>
            <BaseChatSidebar.Body className="border-bottom">
                <div className="container-fluid">
                    <ul className="nav nav-tabs nav-justified bg-light rounded-0" role="tablist">
                        <li className="nav-item cursor-pointer" onClick={() => {setTargetMediaTabId("render-chat-images-videos")}}>
                            <div className={"nav-link " + (targetMediaTabId === "render-chat-images-videos" ? "active" : null)}>Photos/Videos</div>
                        </li>
                        <li className="nav-item cursor-pointer" onClick={() => {setTargetMediaTabId("render-chat-files")}}>
                            <div className={"nav-link " + (targetMediaTabId === "render-chat-files" ? "active" : null)}>Files</div>
                        </li>
                        <li className="nav-item cursor-pointer" onClick={() => {setTargetMediaTabId("render-chat-links")}}>
                            <div className={"nav-link " + (targetMediaTabId === "render-chat-links" ? "active" : null)}>Links</div>
                        </li>
                    </ul>
                    <ChatInfoMediaContext.Provider value={{targetMediaTabId}} >
                        <ChatImagesVideos />
                        <ChatFiles />
                        <ChatLinks />
                    </ChatInfoMediaContext.Provider>
                </div>
            </BaseChatSidebar.Body>
            <BaseChatSidebar.Footer>

            </BaseChatSidebar.Footer>
        </BaseChatSidebar.ChildrenCS>
    )
}
const ChatImagesVideos = () => {
    const {targetMediaTabId} = useContext(ChatInfoMediaContext)
    return targetMediaTabId === "render-chat-images-videos" ?(
        <>
            <h1>Chat images videos</h1>
        </>
    ) : null
}
const ChatFiles = () => {
    const {targetMediaTabId} = useContext(ChatInfoMediaContext)
    return targetMediaTabId === "render-chat-files" ?(
        <>
            <h1>Chat files</h1>
        </>
    ) : null
}
const ChatLinks = () => {
    const {targetMediaTabId} = useContext(ChatInfoMediaContext)
    return targetMediaTabId === "render-chat-links" ?(
        <>
            <h1>Chat Links</h1>
        </>
    ) : null
}
export default ChatInfoMedia
