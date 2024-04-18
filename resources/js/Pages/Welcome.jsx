import Authenticated from "@/Layouts/Authenticated/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
import {useLocation} from "react-router-dom";
import UserAvatar from "@/Components/UserAvatar.jsx";

export default function Welcome({auth}){
    const user = auth.data;
    const authLayoutData = {
        user: user,
        currentRoute: useLocation().pathname
    }
    return (
        <>
            <Authenticated
                authLayoutData={authLayoutData}
            >
                <Head title="Welcome" />
                <div className="chat flex-column justify-content-center text-center">
                    <div className="container-xxl">
                        <UserAvatar
                            size="xl"
                            user={user}
                        />
                        <h6>Hey, {auth.data.name}!</h6>
                        <p>Please select a chat to start messaging.</p>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}
