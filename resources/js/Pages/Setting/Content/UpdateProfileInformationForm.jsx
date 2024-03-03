import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from "@/Components/Button";
import {Transition} from "@headlessui/react";
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import TextareaInput from "@/Components/TextareaInput.jsx";
import SettingCard from "@/Pages/Setting/Partials/SettingCard.jsx";

export default function UpdateProfileInformation({ mustVerifyEmail, status, showStatus,  className = '' }) {
    const user = usePage().props.auth.data;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });
    const submit = (e) => {
        e.preventDefault();
        patch(route('user.updateAccount'));
    };
    return (
        <SettingCard
            title="Account"
            dataTarget="profile-settings-account"
            icon="user"
        >
            <section className={className}>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <InputLabel htmlFor="name" value="Name" className="small"/>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            error={errors.name}
                            autoComplete="username"
                            placeholder="Enter your name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>

                    <div className="form-group">
                        <InputLabel htmlFor="email" value="Email" className="small"/>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            error={errors.email}
                            autoComplete="username"
                            placeholder="Enter your email"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2"/>
                    </div>
                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800">
                                Your email address is unverified{". "}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    // className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    style={{
                                        "borderRadius": "0.375rem",
                                        "fontSize": "0.875rem",
                                        "lineHeight": "1.25rem",
                                        "color": "#4B5563",
                                        "textDecoration": "underline",
                                        ":hover": {"color": "#111827"}
                                    }}
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && showStatus("A new verification link has been sent to your email address", "success", "Handle Successfully", "center", 4000)}
                        </div>
                    )}
                    <Button size="lg" className="btn-block mt-6" disabled={processing}>
                        Save Preferences
                    </Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        {recentlySuccessful && showStatus("Your information has been saved")}
                    </Transition>
                </form>
            </section>
        </SettingCard>
    );
}
