import { useState } from 'react';
import Navbar from "@/Layouts/Authenticated/Navbar/Navbar.jsx";
import Sidebar from "@/Layouts/Authenticated/Sidebar/Sidebar.jsx";

export default function Authenticated({route, user, header, children , open= false}) {
    return (
        <>
            <Navbar
                route={route}
            />
            <Sidebar
                user = {user}
                route={route}
            />
            <div className={"main " + ((open) ? " main-visible" : null)} data-mobile-height="">
                {children}
            </div>
        </>
    );
}
