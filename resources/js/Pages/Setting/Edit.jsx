import AuthenticatedLayout from '@/Layouts/Authenticated/AuthenticatedLayout';
import UpdatePasswordForm from './Content/UpdatePasswordForm';
import UpdateProfileInformationForm from './Content/UpdateProfileInformationForm';
import ToggleLayoutButton from "@/Components/ToggleLayoutButton.jsx";
import { Head } from '@inertiajs/react';
import Swal from "sweetalert2";
import {useLocation} from "react-router-dom";
import UpdateSocialInformation from "@/Pages/Setting/Content/UpdateSocialInformation.jsx";
import NotificationSetting from "@/Pages/Setting/Content/NotificationSetting.jsx";
import SettingCard from "@/Pages/Setting/Partials/SettingCard.jsx";
import UpdateUserAvatar from "@/Pages/Setting/Content/UpdateUserAvatar.jsx";
import {useEffect} from "react";


export default function Edit({ auth, mustVerifyEmail, status }) {
    const showStatus = (message, type="success", title="Handle Successfully", position="top-end", time=2000) => {
        Swal.fire({
            position: position,
            icon: type,
            title: title,
            text: message,
            showConfirmButton: false,
            timer: time
        });
    }
    const authLayoutData = {
        user: auth.data ,
        currentRoute: useLocation().pathname
    }
    useEffect(()=> {
        window.addEventListener('load', function() {
            // Set the scroll position to the top
            window.scrollTo(0, 0);
        });
    })
    return (
        <AuthenticatedLayout
            open={true}
            authLayoutData = {authLayoutData}
        >
            <Head title="Setting"/>
            <div className="chat">
                <div className="chat-body">
                    <div className="chat-header border-bottom py-4 py-lg-6 px-lg-8">
                        <div className="container-xxl">
                            <div className="row align-items-center">
                                <div className="col-3 d-xl-none">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item">
                                            <ToggleLayoutButton/>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-6 col-xl-6">
                                    <div className="media text-center text-xl-left">
                                        <div className="media-body align-self-center text-truncate">
                                            <h6 className="text-truncate mb-n1">Settings</h6>
                                            <small className="text-muted">Update your profile details</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="chat-content px-lg-8">
                        <div className="container-xxl py-6 py-lg-10">
                            <div className="accordion modified-accordion mb-n6 mb-lg-8" id="profile-settings">
                                <div className="" >
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        showStatus={showStatus}
                                    />
                                    <UpdatePasswordForm
                                        showStatus={showStatus}
                                    />

                                    <NotificationSetting
                                        showStatus={showStatus}
                                    />
                                    <UpdateSocialInformation
                                        showStatus={showStatus}
                                    />
                                    <UpdateUserAvatar />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
