import {createContext, useContext, useEffect, useState} from "react";

const DropdownContext = createContext()
const Dropdown = ({children, defaultOpen=true}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return (
        <DropdownContext.Provider value={{isOpen, setIsOpen}}>
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
    const {isOpen} = useContext(DropdownContext)
    return isOpen && (
        <div>
            {children}
        </div>
    )
}
Dropdown.Open = OpenDropdown
Dropdown.Content = Content
export default Dropdown
