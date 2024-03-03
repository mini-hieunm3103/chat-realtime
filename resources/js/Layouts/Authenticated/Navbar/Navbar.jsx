import React from "react";
import ToggleLayoutButton from "@/Components/ToggleLayoutButton.jsx";
function Navbar({route=""}) {
    let menuIcons = [
        {
            "title" :  "Center Nav",
            "icon": "x",
            "href": "#",
            "liClass": " d-none d-xl-block invisible flex-xl-grow-1",
            "active" : false,
            "isLink" : false
        },
        {
            "title" :  "Create chat",
            "icon": "edit",
            "href": "#tab-content-create-chat",
            "liClass": "position-relative p-0 py-xl-3",
            "active" : false,
            "isLink" : false
        },
        {
            "title" :  "Friends",
            "icon": "users",
            "href": "#tab-content-friends",
            "liClass": "mt-xl-9",
            "active" : false,
            "isLink" : false
        },
        {
            "title" :  "Chats",
            "icon": "message-square",
            "href": "#tab-content-dialogs",
            "liClass": "mt-xl-9",
            "active" : true,
            "isLink" : false
        },
        {
            "title" :  "User",
            "icon": "user",
            "href": "#tab-content-user",
            "liClass": "mt-xl-9",
            "active" : false,
            "isLink" : false
        },
        {
            "title" :  "Notification",
            "icon": "bell",
            "href": "#tab-content-noti",
            "liClass": "mt-xl-9",
            "active" : false,
            "isLink" : false
        },
        {
            "title" :  "Center Nav",
            "icon": "x",
            "href": "#",
            "liClass": "mt-xl-9 invisible d-xl-block flex-xl-grow-1 d-none",
            "active" : false,
            "isLink" : false
        },
        {
            "title" :  "Settings",
            "icon": "settings",
            "href": "/settings",
            "liClass": "mt-xl-9",
            "active" : false,
            "isLink" : true
        }
    ]
    return (
        <div className="navigation navbar navbar-light justify-content-center py-xl-7">
            <ul className="nav navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center py-3 py-lg-0"
                role="tablist">
                {
                    menuIcons.map((menuIcon, i) => {
                        let active = (menuIcon.active) ? " active" : ""
                        return (
                            <li className={"nav-item " + menuIcon.liClass} key={i}>
                                {
                                    (
                                        (route !== menuIcon.href)
                                            ? (
                                                <a className={`nav-link position-relative p-0 py-xl-3 ${active}`}
                                                  href={menuIcon.href}
                                                  title={menuIcon.title}
                                                  {...(!menuIcon.isLink ? {"data-toggle": "tab", "role": "tab"} : {})}
                                                >
                                                    <i className={"icon-lg fe-" + menuIcon.icon}></i>
                                                </a>
                                            )
                                            : (
                                                <ToggleLayoutButton
                                                    btnClass = "position-relative p-0 py-xl-3"
                                                    icon = {menuIcon.icon+ " text-success"}
                                                    size="lg"
                                                />
                                            )
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>

    )
}

export default Navbar;
