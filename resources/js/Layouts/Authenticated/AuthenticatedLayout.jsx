import { useState } from 'react';
import Navbar from "@/Layouts/Authenticated/Navbar/Navbar.jsx";
import Sidebar from "@/Layouts/Authenticated/Sidebar/Sidebar.jsx";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="layout">
            <Navbar />
            <Sidebar
                user = {user}
            />
            <div className="main main-visible" data-mobile-height="">
                {children}
            </div>
        </div>
    );
}
