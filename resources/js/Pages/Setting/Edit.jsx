import AuthenticatedLayout from '@/Layouts/Authenticated/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';


export default function Edit({ auth, mustVerifyEmail, status }) {
    const user = auth.data
    return (
        <AuthenticatedLayout
            user={user}
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
                                            <a className="text-muted px-0" href="#" data-chat="open">
                                                <i className="icon-md fe-chevron-left"></i>
                                            </a>
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
                                                <UpdatePasswordForm/>
                                            </div>
                                        </div>

                                    </div>
                                    {/*<div className="card mb-6 mb-lg-8">*/}
                                    {/*    <div className="card-header position-relative">*/}
                                    {/*        <a href="#" className="text-reset d-block stretched-link collapsed"*/}
                                    {/*           data-toggle="collapse" data-target="#profile-settings-delete"*/}
                                    {/*           aria-expanded="true" aria-controls="profile-settings-delete">*/}
                                    {/*            <div className="row no-gutters align-items-center">*/}
                                    {/*                <div className="col">*/}
                                    {/*                    <h5>Delete Account</h5>*/}
                                    {/*                    <p>Once your account is deleted, all of its resources and data will be permanently deleted.</p>*/}
                                    {/*                </div>*/}

                                    {/*                <div className="col-auto">*/}
                                    {/*                    <i className="text-muted icon-md fe-trash"></i>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </a>*/}
                                    {/*    </div>*/}

                                    {/*    <div id="profile-settings-delete" className="collapse"*/}
                                    {/*         data-parent="#profile-settings">*/}
                                    {/*        <div className="card-body">*/}
                                    {/*            <DeleteUserForm/>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}

                                    {/*</div>*/}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
