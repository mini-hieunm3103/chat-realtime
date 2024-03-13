import {createContext, useContext, useState} from "react";

const DropdownContext = createContext()

const Dropdown = ({dropdownId, children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openId, setOpenId] = useState("")
    return (
        <DropdownContext.Provider value={{dropdownId, isOpen, setIsOpen, openId, setOpenId}}>
            {children}
        </DropdownContext.Provider>
    )
}
const OpenDropdown = ({targetId, children}) => {
    const {dropdownId, isOpen, setIsOpen, openId, setOpenId} = useContext(DropdownContext)
    const toggle = () => {
        setOpenId(targetId)
        setIsOpen(prevState => !prevState)
    }
    return (
        <div onClick={toggle}>
            {children}
        </div>
    )
}
const Content = ({children}) => {
    const {dropdownId, isOpen, openId} = useContext(DropdownContext)
    return isOpen && openId === dropdownId && (
        <div id={dropdownId}>
            {children}
        </div>
    )
}
Dropdown.Open = OpenDropdown
Dropdown.Content = Content
export default Dropdown
