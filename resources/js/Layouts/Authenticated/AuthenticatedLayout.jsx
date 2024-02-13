import { useState } from 'react';
import Navbar from "@/Layouts/Authenticated/Navbar/Navbar.jsx";
import Sidebar from "@/Layouts/Authenticated/Sidebar/Sidebar.jsx";

export default function Authenticated({ user, header, children , open= false}) {
    return (
        <>
            <Navbar />
            <Sidebar
                user = {user}
            />
            <div className={"main " + ((open) ? " main-visible" : null)} data-mobile-height="">
                {children}
            </div>
        </>
    );
}
