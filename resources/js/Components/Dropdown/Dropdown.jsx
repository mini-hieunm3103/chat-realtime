import {createContext, useContext, useEffect, useState} from "react";

const DropdownContext = createContext()
const Dropdown = ({dropdownId, children, defaultOpen=true}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return (
        <DropdownContext.Provider value={{dropdownId, isOpen, setIsOpen}}>
            {children}
        </DropdownContext.Provider>
    )
}
const OpenDropdown = ({children}) => {
    const {setIsOpen} = useContext(DropdownContext)
    const toggle = () => {
        setIsOpen(prevState => !prevState)
    }
    return (
        <div onClick={toggle} className="cursor-default">
            {children}
        </div>
    )
}
const Content = ({children}) => {
    const {dropdownId, isOpen} = useContext(DropdownContext)
    return isOpen && (
        <div id={dropdownId}>
            {children}
        </div>
    )
}
Dropdown.Open = OpenDropdown
Dropdown.Content = Content
export default Dropdown
