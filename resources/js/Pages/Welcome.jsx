import Authenticated from "@/Layouts/Authenticated/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

export default function Welcome({auth}){
    return (
        <>
            <Authenticated
                user={auth.data}
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
