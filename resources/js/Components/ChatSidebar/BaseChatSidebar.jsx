import {createContext, useContext, useEffect, useState} from "react";

const BaseChatSidebarContext = createContext()

/*

CS: ChatSidebar

* */
const BaseChatSidebar = ({isOpenCS, children}) => {
    const [openMainCS, setOpenMainCS] = useState(true)
    // ngay lúc open ChatSidebar thì phải open luôn MainCS
    const [childrenId, setChildrenId] = useState("")
    useEffect(()=> {
        if (isOpenCS) {
            document.body.classList.add('sidebar-is-open')
        } else {
            // reset biến để khi open ChatSidebar thì mở MainCS chứ k mở ChildrenCS
            document.body.classList.remove('sidebar-is-open')
            setChildrenId("")
            setOpenMainCS(true)
        }
    }, [isOpenCS])

    return isOpenCS && (
        <BaseChatSidebarContext.Provider value={{openMainCS, setOpenMainCS, childrenId, setChildrenId}}>
            <div style={{borderLeft: "1px solid rgb(87 75 75)"}}>
                {children}
            </div>
        </BaseChatSidebarContext.Provider>
    )
}
const MainCS = ({children}) => {
    // nếu có children id thì sẽ remove
    const {openMainCS, setOpenMainCS, childrenId, setChildrenId} = useContext(BaseChatSidebarContext)
    return openMainCS && (
        <div className="chat-sidebar sidebar chat-sidebar-visible">
            <div className="d-flex h-100 flex-column">
                {children}
            </div>
        </div>
    )
}
const TriggerChildrenCS = ({childrenCSId, isOpen= true,  className, children}) => {
    // sẽ là nút bên trong main sidebar và sẽ có tác dụng ẩn main CS và hiện children CS
    const {openMainCS, setOpenMainCS, childrenId, setChildrenId} = useContext(BaseChatSidebarContext)
    const trigger = () => {
        if (isOpen) {
            setChildrenId(childrenCSId)
            setOpenMainCS(false) // close MainCS
        } else {
            setChildrenId("")
            setOpenMainCS(true)
        }

    }
    return (
        <div className={className} onClick={trigger}>
            {children}
        </div>
    )
}
const ChildrenCS = ({childrenCSId, children}) => {
    //
    const {childrenId} = useContext(BaseChatSidebarContext)
    return (childrenId === childrenCSId) && (
        <div id={childrenCSId} className="chat-sidebar chat-sidebar-visible">
            <div className="d-flex h-100 flex-column">
                {children}
            </div>
        </div>
    )
}
const Header = ({children, className=""}) => {
    return  (
        <div className={className + " py-4 py-lg-6"} style={{backgroundColor: "rgb(41, 36, 42)"}}>
            <div className="container-fluid">
                {children}
            </div>
        </div>
    )
}
const Body = ({children}) => {
    return (
        <div className="hide-scrollbar flex-fill">
            {children}
        </div>
    )
}
const Footer = ({children}) => {
    return (
        <div className="border-top py-7">
            <div className="container-fluid">
                {children}
            </div>
        </div>
    )
}
BaseChatSidebar.MainCS = MainCS
BaseChatSidebar.ChildrenCS = ChildrenCS
BaseChatSidebar.TriggerChildrenCS = TriggerChildrenCS
BaseChatSidebar.Header = Header
BaseChatSidebar.Body = Body
BaseChatSidebar.Footer = Footer
export default BaseChatSidebar
