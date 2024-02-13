import AuthenticatedLayout from '@/Layouts/Authenticated/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ToggleLayoutButton from "@/Components/ToggleLayoutButton.jsx";
import { Head } from '@inertiajs/react';
import Swal from "sweetalert2";
import {useLocation} from "react-router-dom";


export default function Edit({ auth, mustVerifyEmail, status }) {

    const currentRoute = useLocation().pathname;
    const user = auth.data
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
    return (
        <AuthenticatedLayout
            user={user}
            open={true}
            route={currentRoute}
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
                                            <ToggleLayoutButton />
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
                                <div className="">

                                    <div className="card mb-6 mb-lg-8">
                                        <div className="card-header position-relative">
                                            <a href="#" className="text-reset d-block stretched-link collapsed"
                                               data-toggle="collapse" data-target="#profile-settings-account"
                                               aria-controls="profile-settings-account" aria-expanded="true">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col">
                                                        <h5>Account</h5>
                                                        <p>Update your profile details.</p>
                                                    </div>

                                                    <div className="col-auto">
                                                        <i className="text-muted icon-md fe-user"></i>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div id="profile-settings-account" className="collapse"
                                             data-parent="#profile-settings">
                                            <div className="card-body">
                                                <UpdateProfileInformationForm
                                                    mustVerifyEmail={mustVerifyEmail}
                                                    status={status}
                                                    showStatus = {showStatus}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mb-6 mb-lg-8">
                                        <div className="card-header position-relative">
                                            <a href="#" className="text-reset d-block stretched-link collapsed"
                                               data-toggle="collapse" data-target="#profile-settings-security"
                                               aria-expanded="true" aria-controls="profile-settings-security">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col">
                                                        <h5>Security</h5>
                                                        <p>Update your password.</p>
                                                    </div>

                                                    <div className="col-auto">
                                                        <i className="text-muted icon-md fe-shield"></i>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        <div id="profile-settings-security" className="collapse"
                                             data-parent="#profile-settings">
                                            <div className="card-body">
                                                <UpdatePasswordForm
                                                    showStatus = {showStatus}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
