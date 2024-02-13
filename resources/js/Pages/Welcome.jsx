import Authenticated from "@/Layouts/Authenticated/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
import {useLocation} from "react-router-dom";

export default function Welcome({auth}){
    const currentRoute = useLocation().pathname;
    return (
        <>
            <Authenticated
                user={auth.data}
                route={currentRoute}
            >
                <Head title="Welcome" />
                <div className="chat flex-column justify-content-center text-center">
                    <div className="container-xxl">
                        <div className="avatar avatar-lg mb-5 bg-primary text-white">
                            <span>{auth.data.name.charAt(0)}</span>
                        </div>
                        <h6>Hey, {auth.data.name}!</h6>
                        <p>Please select a chat to start messaging.</p>
                    </div>
                </div>
            </Authenticated>
        </>
    )
}
