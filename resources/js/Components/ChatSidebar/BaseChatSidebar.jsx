import {createContext, useContext, useEffect, useState} from "react";

const BaseChatSidebarContext = createContext()

/*

CS: ChatSidebar

* */
const BaseChatSidebar = ({isOpenCS, children}) => {
    const [openMainCS, setOpenMainCS] = useState(true)
    // ngay lúc open ChatSidebar thì phải open luôn MainCS
    const [actions, setActions] = useState([]);
    const [childrenId, setChildrenId] = useState(null)
    useEffect(()=> {
        if (isOpenCS) {
            document.body.classList.add('sidebar-is-open')
        } else {
            // reset biến để khi open ChatSidebar thì mở MainCS chứ k mở ChildrenCS
            document.body.classList.remove('sidebar-is-open')
            setChildrenId(null)
            setOpenMainCS(true)
        }
    }, [isOpenCS])

    return isOpenCS && (
        <BaseChatSidebarContext.Provider value={{openMainCS, setOpenMainCS, childrenId, setChildrenId, actions, setActions}}>
            <div style={{borderLeft: "1px solid rgb(87 75 75)"}}>
                {children}
            </div>
        </BaseChatSidebarContext.Provider>
    )
}
const MainCS = ({children}) => {
    // nếu có children id thì sẽ remove
    const {openMainCS} = useContext(BaseChatSidebarContext)
    return openMainCS && (
        <div className="chat-sidebar sidebar chat-sidebar-visible">
            <div className="d-flex h-100 flex-column">
                {children}
            </div>
        </div>
    )
}
const OpenChildrenCS = ({childrenCSId,  className, children}) => {

    // sẽ là nút bên trong main sidebar và sẽ có tác dụng ẩn main CS và hiện children CS
    const {setOpenMainCS, childrenId, setChildrenId, actions, setActions} = useContext(BaseChatSidebarContext)
    const handleOpen = () => {
        if (childrenId != null && childrenId !== childrenCSId){
            // save currentCSId
            setActions([...actions, childrenId])
        }
        setChildrenId(childrenCSId)
        setOpenMainCS(false) // close MainCS
    }
    return (
        <div className={className} onClick={handleOpen}>
            {children}
        </div>
    )
}
const CloseCurrentCS = ({children, className}) => {
    const {setOpenMainCS, setChildrenId, actions, setActions} = useContext(BaseChatSidebarContext)
    const handleClose = () => {
        if (actions.length > 0) {
            // Set childrenId to the last item in the updated actions array
            const previousChildrenId = actions.pop();
            setChildrenId(previousChildrenId);
            setActions([...actions]);
        } else {
            setChildrenId(null);
            setOpenMainCS(true);
        }
    };

    return (
        <div className={className} onClick={handleClose}>
            {children}
        </div>
    )
}
const ChildrenCS = ({childrenCSId, children, className = ""}) => {
    //
    const {childrenId} = useContext(BaseChatSidebarContext)
    return (childrenId === childrenCSId) && (
        <div id={childrenCSId} className={"chat-sidebar chat-sidebar-visible " + className}>
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
const Body = ({children, className, ...props}) => {
    return (
        <div {...props} className={"hide-scrollbar flex-fill " + className}>
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
BaseChatSidebar.CloseCurrentCS = CloseCurrentCS
BaseChatSidebar.OpenChildrenCS =OpenChildrenCS
BaseChatSidebar.Header = Header
BaseChatSidebar.Body = Body
BaseChatSidebar.Footer = Footer
export default BaseChatSidebar
